package petfinder.site.endpoint;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriUtils;

import petfinder.site.common.booking.Booking;
import petfinder.site.common.user.OwnerNotification;
import petfinder.site.common.user.SitterNotification;
import petfinder.site.common.user.UserDto;

import java.util.*;
import java.io.IOException;


@RestController
@RequestMapping(value = "/api/bookings")
public class BookingEndpoint {
    @Autowired
    static final ObjectMapper mapper = new ObjectMapper();

    // Returns user information for a given username
    @RequestMapping(path = "/booking", method = RequestMethod.GET)
    public static ResponseEntity<String> getBooking(@RequestParam(name = "id") String id){
        return EndpointUtil.getQuery("/bookings/booking/" + id, true, true);
    }

    @RequestMapping(path = "/book", method = RequestMethod.POST)
    public static ResponseEntity<String> createBooking(@RequestBody Booking booking){
        try {
        	ResponseEntity<String> createBookingResponse = EndpointUtil.indexQuery("/bookings/booking", null, mapper.writeValueAsString(booking), false);
        	if (!createBookingResponse.getStatusCode().is2xxSuccessful()) {
        		return createBookingResponse;
        	}

        	String bookingID = (String)((HashMap<String, Object>)mapper.readValue(createBookingResponse.getBody(), HashMap.class)).get("_id");
        	
	        // add notification to owner
        	UserEndpoint.addUserNotification(booking.getOwnerUsername(), OwnerNotification.createRequestNotification(bookingID, booking));
	        // add notification to sitter
        	UserEndpoint.addUserNotification(booking.getSitterUsername(), SitterNotification.createRequestNotification(bookingID, booking));

            return createBookingResponse;
        } catch (IOException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    private static void checkRawBookingHits(List<HashMap<String, Object>> rawHits) throws IOException {
    	// Use iterator so we can remove while iterating
    	for (Iterator<HashMap<String, Object>> iterator = rawHits.iterator(); iterator.hasNext();) {
    	    HashMap<String, Object> rawHit = iterator.next();

    		String bookingID = (String)rawHit.get("_id");
    		Booking booking = mapper.convertValue(rawHit.get("_source"), Booking.class);
    		if (booking.shouldEnd()) {
    			booking.setEnded(true);
    			
    			UserEndpoint.addUserNotification(booking.getOwnerUsername(), OwnerNotification.createCompleteNotification(bookingID, booking));
    			
				reindexBooking(bookingID, booking);
				
    	        iterator.remove();
    	    }
    	}
    }

    @RequestMapping(path = "/ownerbookings", method = RequestMethod.GET)
    public static ResponseEntity<String> getOwnerBookings() {
    	try {
	    	ResponseEntity<String> bookingsResponse = EndpointUtil.searchMultipleQuery("/bookings/booking", "ownerUsername:" + UserEndpoint.getCurrentUsername() + " AND sitterDecline:false", 1000, false, true);
	    	if (bookingsResponse.getStatusCode() != HttpStatus.OK) {
	    		return bookingsResponse;
	    	}
	    	
	    	List<HashMap<String, Object>> rawHits = (List<HashMap<String, Object>>)mapper.readValue(bookingsResponse.getBody(), List.class);

	    	checkRawBookingHits(rawHits);
	    	if (rawHits.size() == 0) {
	    		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
	    	}
	    	
			return ResponseEntity.ok(mapper.writeValueAsString(EndpointUtil.scrapeSource(rawHits, true)));
	    } catch (NotAuthenticatedException e) {
			return e.getNewResponseEntity();
		} catch (IOException ex) {
	        ex.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
    }

    @RequestMapping(path = "/sitterbookings", method = RequestMethod.GET)
    public static ResponseEntity<String> getSitterBookings() {
    	try {
	    	ResponseEntity<String> bookingsResponse = EndpointUtil.searchMultipleQuery("/bookings/booking", "sitterUsername:" + UserEndpoint.getCurrentUsername() + " AND sitterDecline:false", 1000, false, true);
	    	if (bookingsResponse.getStatusCode() != HttpStatus.OK) {
	    		return bookingsResponse;
	    	}
	    	
	    	List<HashMap<String, Object>> rawHits = (List<HashMap<String, Object>>)mapper.readValue(bookingsResponse.getBody(), List.class);
	
	    	checkRawBookingHits(rawHits);
	    	
			return ResponseEntity.ok(mapper.writeValueAsString(EndpointUtil.scrapeSource(rawHits, true)));
	    } catch (NotAuthenticatedException e) {
			return e.getNewResponseEntity();
		} catch (IOException ex) {
	        ex.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
    }
    
    @RequestMapping(path = "/finalizebooking", method = RequestMethod.POST)
    public static ResponseEntity<String> finalizeBooking(@RequestParam(name = "bookingID") String bookingID, @RequestParam(name = "approve") boolean approve){
    	//TODO: find some way to allow the owner and sitter to contact each other further
    	try {
    		ResponseEntity<String> getBookingResponse = EndpointUtil.getQuery("/bookings/booking/" + bookingID, true, false);
            Booking booking = mapper.readValue(getBookingResponse.getBody(), Booking.class);
            
            // If one of sitterApprove or sitterDecline is set to true, the booking has already been finalized.
            if (booking.getSitterApprove() || booking.getSitterDecline()) {
            	return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Booking with id " + bookingID + " has already been finalized.");
            }
    		
    		HashMap<String, Object> partialDoc = new HashMap<String, Object>();
    		if (approve) {
    			partialDoc.put("sitterApprove", true);
    			UserEndpoint.addUserNotification(booking.getOwnerUsername(), OwnerNotification.createAcceptNotification(bookingID, booking));
    			UserEndpoint.addUserNotification(booking.getSitterUsername(), SitterNotification.createAcceptNotification(bookingID, booking));
    		} else {
    			partialDoc.put("sitterDecline", true);
    			UserEndpoint.addUserNotification(booking.getOwnerUsername(), OwnerNotification.createDeclineNotification(bookingID, booking));
    			UserEndpoint.addUserNotification(booking.getSitterUsername(), SitterNotification.createDeclineNotification(bookingID, booking));
    		}
			return EndpointUtil.updateQuery("/bookings/booking/" + bookingID, mapper.writeValueAsString(partialDoc));
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }
    
    @RequestMapping(path = "/ratesitter", method = RequestMethod.POST)
    public static ResponseEntity<String> rateSitter(@RequestParam(name = "bookingID") String bookingID, @RequestParam(name = "rating") double rating){
    	try {
    		ResponseEntity<String> getBookingResponse = EndpointUtil.getQuery("/bookings/booking/" + bookingID, true, false);
            Booking booking = mapper.readValue(getBookingResponse.getBody(), Booking.class);
            
            // If one of sitterApprove or sitterDecline is set to true, the booking has already been finalized.
            if (booking.getOwnerRating() >= 0) {
            	return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Booking with id " + bookingID + " has already been finalized.");
            }

            // Set the rating for the booking
            booking.setOwnerRating(rating);
    		
            // update the booking
			ResponseEntity<String> updateBookingReponse = EndpointUtil.indexQuery("/bookings/booking/", bookingID, mapper.writeValueAsString(booking), false);
			if (!updateBookingReponse.getStatusCode().is2xxSuccessful()) {
				return updateBookingReponse;
			}
			
            // Get the sitter so we can modify them
    		ResponseEntity<String> getSitterResponse = EndpointUtil.getQuery("/users/user/" + booking.getSitterUsername(), true, false);
            UserDto sitter = mapper.readValue(getSitterResponse.getBody(), UserDto.class);
			
            sitter.addRating(rating);
			
            // update the sitter
			return UserEndpoint.reindexUser(booking.getSitterUsername(), sitter);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }

    @RequestMapping(path = "/messagesitter", method = RequestMethod.POST)
    public static ResponseEntity<String> messageSitter(@RequestParam(name = "bookingID") String bookingID, @RequestParam(name = "sitterUsername") String sitterUsername, @RequestParam(name = "message") String message) {
    	try {
    		return UserEndpoint.addUserNotification(sitterUsername, SitterNotification.createMessageNotification(bookingID, UserEndpoint.getCurrentUsername(), message));
    	} catch (NotAuthenticatedException e) {
			return e.getNewResponseEntity();
		} catch (IOException e) {
    		e.printStackTrace();
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    	}
    }
    
    @RequestMapping(path = "/messageowner", method = RequestMethod.POST)
    public static ResponseEntity<String> messageOwner(@RequestParam(name = "bookingID") String bookingID, @RequestParam(name = "ownerUsername") String ownerUsername, @RequestParam(name = "message") String message) {
    	try {
    		return UserEndpoint.addUserNotification(ownerUsername, OwnerNotification.createMessageNotification(bookingID, UserEndpoint.getCurrentUsername(), message));
    	} catch (NotAuthenticatedException e) {
			return e.getNewResponseEntity();
		} catch (IOException e) {
    		e.printStackTrace();
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    	}
    }

	public static ResponseEntity<String> reindexBooking(String bookingID, Booking booking) throws JsonProcessingException {
		return EndpointUtil.indexQuery("/bookings/booking/", bookingID, mapper.writeValueAsString(booking), false);
	}
}





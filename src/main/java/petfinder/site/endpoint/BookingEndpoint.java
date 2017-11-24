package petfinder.site.endpoint;


import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import petfinder.site.common.booking.Booking;
import petfinder.site.common.user.Notification.NotificationType;
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
        System.out.println(booking.toString());

        try {
        	ResponseEntity<String> createBookingResponse = EndpointUtil.indexQuery("/bookings/booking", null, mapper.writeValueAsString(booking), false);
        	if (!createBookingResponse.getStatusCode().is2xxSuccessful()) {
        		return createBookingResponse;
        	}

        	String bookingID = (String)((HashMap<String, Object>)mapper.readValue(createBookingResponse.getBody(), HashMap.class)).get("_id");
        	
	        // add notification to owner
        	UserEndpoint.addOwnerNotification(booking.getOwnerUsername(), NotificationType.REQUEST, bookingID, booking);

	        // add notification to sitter
        	UserEndpoint.addSitterNotification(booking.getSitterUsername(), NotificationType.REQUEST, bookingID, booking);	        

            return createBookingResponse;
        } catch (IOException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @RequestMapping(path = "/ownerbookings", method = RequestMethod.GET)
    public static ResponseEntity<String> getOwnerBookings(@RequestParam(name = "username") String username) {
    	String curTimeString = Long.toString(System.currentTimeMillis());
		return EndpointUtil.searchMultipleQuery("/bookings/booking", "ownerUsername:" + username + " AND endDate:>" + curTimeString + " AND sitterDecline:false", 1000, true);
    }

    @RequestMapping(path = "/sitterbookings", method = RequestMethod.GET)
    public static ResponseEntity<String> getSitterBookings(@RequestParam(name = "username") String username) {
    	String curTimeString = Long.toString(System.currentTimeMillis());
		return EndpointUtil.searchMultipleQuery("/bookings/booking", "sitterUsername:" + username + " AND endDate:>" + curTimeString + " AND sitterDecline:false", 1000, true);
    }
    
    @RequestMapping(path = "/finalizebooking", method = RequestMethod.POST)
    public static ResponseEntity<String> finalizeBooking(@RequestParam(name = "bookingID") String bookingID, @RequestParam(name = "approve") boolean approve){
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
    			UserEndpoint.addOwnerNotification(booking.getOwnerUsername(), NotificationType.ACCEPT, bookingID, booking);
    			UserEndpoint.addSitterNotification(booking.getSitterUsername(), NotificationType.ACCEPT, bookingID, booking);
    		} else {
    			partialDoc.put("sitterDecline", true);
    			UserEndpoint.addOwnerNotification(booking.getOwnerUsername(), NotificationType.DECLINE, bookingID, booking);
    			UserEndpoint.addSitterNotification(booking.getSitterUsername(), NotificationType.DECLINE, bookingID, booking);
    		}
			return EndpointUtil.updateQuery("/bookings/booking/" + bookingID, mapper.writeValueAsString(partialDoc));
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }
    
    @RequestMapping(path = "/ratesitter", method = RequestMethod.POST)
    public static ResponseEntity<String> ratesitter(@RequestParam(name = "bookingID") String bookingID, @RequestParam(name = "rating") double rating){
    	try {
    		ResponseEntity<String> getBookingResponse = EndpointUtil.getQuery("/bookings/booking/" + bookingID, true, false);
            Booking booking = mapper.readValue(getBookingResponse.getBody(), Booking.class);
            
            // If one of sitterApprove or sitterDecline is set to true, the booking has already been finalized.
            if (booking.getOwnerRating() >= 0) {
            	return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Booking with id " + bookingID + " has already been finalized.");
            }

            booking.setOwnerRating(rating);

    		ResponseEntity<String> getSitterResponse = EndpointUtil.getQuery("/users/user/" + booking.getSitterUsername(), true, false);
            UserDto sitter = mapper.readValue(getSitterResponse.getBody(), UserDto.class);
			
            sitter.addRating(rating);
    		
			ResponseEntity<String> updateBookingReponse = EndpointUtil.indexQuery("/bookings/booking/", bookingID, mapper.writeValueAsString(booking), false);
			if (!updateBookingReponse.getStatusCode().is2xxSuccessful()) {
				return updateBookingReponse;
			}
			return EndpointUtil.indexQuery("/users/user/", booking.getSitterUsername(), mapper.writeValueAsString(sitter), false);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }
}
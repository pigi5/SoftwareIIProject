package petfinder.site.endpoint;


import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import petfinder.site.common.booking.Booking;
import petfinder.site.common.user.Notification.NotificationType;

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
	        // add notification to owner
        	UserEndpoint.addOwnerNotification(booking.getOwnerUsername(), NotificationType.REQUEST, booking);

	        // add notification to sitter
        	UserEndpoint.addSitterNotification(booking.getSitterUsername(), NotificationType.REQUEST, booking);	        

            return EndpointUtil.indexQueryPost("/bookings/booking", mapper.writeValueAsString(booking));
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
    			UserEndpoint.addOwnerNotification(booking.getOwnerUsername(), NotificationType.ACCEPT, booking);
    			UserEndpoint.addSitterNotification(booking.getSitterUsername(), NotificationType.ACCEPT, booking);
    		} else {
    			partialDoc.put("sitterDecline", true);
    			UserEndpoint.addOwnerNotification(booking.getOwnerUsername(), NotificationType.DECLINE, booking);
    			UserEndpoint.addSitterNotification(booking.getSitterUsername(), NotificationType.DECLINE, booking);
    		}
			return EndpointUtil.updateQuery("/bookings/booking/" + bookingID, mapper.writeValueAsString(partialDoc));
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }
}
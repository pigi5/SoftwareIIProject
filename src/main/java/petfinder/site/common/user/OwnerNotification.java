package petfinder.site.common.user;

import java.util.Date;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.booking.Booking;
import petfinder.site.common.pet.PetDto;

public class OwnerNotification extends Notification {
    private boolean ownerRated;
    
    public OwnerNotification() {}
    
    private OwnerNotification(NotificationType notificationType, String bookingID, String title, String message) {
    	super(notificationType, bookingID, title, message);
    	ownerRated = false;
    }
	
	public boolean isOwnerRated() {
		return ownerRated;
	}
	public void setOwnerRated(boolean ownerRated) {
		this.ownerRated = ownerRated;
	}

    @Override
    public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return super.toString();
        }
    }
    
    public static OwnerNotification createRequestNotification(String bookingID, Booking booking) {
        String petString = "";
        String endDateString = "";
        String startDateString = "";
        String sitterUsername = "";
        if (booking != null) {
	        petString = booking.getPetsSit().stream()
	    		  .map(PetDto::getName)
	    		  .collect(Collectors.joining(", "));
	
	        startDateString = df.format(new Date(booking.getStartDate()));
	        endDateString = df.format(new Date(booking.getEndDate()));
	        sitterUsername = booking.getSitterUsername();
        }
    	
    	String title = "Appointment Requested";
    	String message = "You have requested " + sitterUsername + " to sit your pet(s): " + petString + " from " + startDateString + " to " + endDateString;
    	return new OwnerNotification(NotificationType.REQUEST, bookingID, title, message);
    }

    public static OwnerNotification createAcceptNotification(String bookingID, Booking booking) {
        String petString = "";
        String endDateString = "";
        String startDateString = "";
        String sitterUsername = "";
        if (booking != null) {
	        petString = booking.getPetsSit().stream()
	    		  .map(PetDto::getName)
	    		  .collect(Collectors.joining(", "));
	
	        startDateString = df.format(new Date(booking.getStartDate()));
	        endDateString = df.format(new Date(booking.getEndDate()));
	        sitterUsername = booking.getSitterUsername();
        }
    	
    	String title = "Appointment Accepted";
    	String message = sitterUsername + " has accepted your request to sit your pet(s): " + petString + " from " + startDateString + " to " + endDateString;
    	return new OwnerNotification(NotificationType.ACCEPT, bookingID, title, message);
    }
    
    public static OwnerNotification createDeclineNotification(String bookingID, Booking booking) {
        String petString = "";
        String endDateString = "";
        String startDateString = "";
        String sitterUsername = "";
        if (booking != null) {
	        petString = booking.getPetsSit().stream()
	    		  .map(PetDto::getName)
	    		  .collect(Collectors.joining(", "));
	
	        startDateString = df.format(new Date(booking.getStartDate()));
	        endDateString = df.format(new Date(booking.getEndDate()));
	        sitterUsername = booking.getSitterUsername();
        }

        String title = "Appointment Declined";
    	String message = sitterUsername + " has declined your request to sit your pet(s): " + petString + " from " + startDateString + " to " + endDateString;
    	return new OwnerNotification(NotificationType.DECLINE, bookingID, title, message);
    }
    
    public static OwnerNotification createCompleteNotification(String bookingID, Booking booking) {
        String sitterUsername = "";
        if (booking != null) {
	        sitterUsername = booking.getSitterUsername();
        }
        
    	String title = "Appointment Complete";
    	String message = "Your appointment with " + sitterUsername + " is over. Please rate their performance.";
    	return new OwnerNotification(NotificationType.COMPLETE, bookingID, title, message);
    }
    
    public static OwnerNotification createMessageNotification(String bookingID, String sitterUsername, String message) {      
    	String title = "Message from " + sitterUsername;
    	return new OwnerNotification(NotificationType.MESSAGE, bookingID, title, message);
    }
}

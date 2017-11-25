package petfinder.site.common.user;

import java.util.Date;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.booking.Booking;
import petfinder.site.common.pet.PetDto;

public class SitterNotification extends Notification {
	
	public SitterNotification() {}

    private SitterNotification(NotificationType notificationType, String bookingID, String title, String message) {
    	super(notificationType, bookingID, title, message);
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

    public static SitterNotification createRequestNotification(String bookingID, Booking booking) {
    	String sitterPetString = "";
        String endDateString = "";
        String startDateString = "";
        String ownerUsername = "";
        if (booking != null) {
	        sitterPetString = booking.getPetsSit().stream()
	      		  .map(PetDto::printNameAndType)
	      		  .collect(Collectors.joining(", "));
	
	        startDateString = df.format(new Date(booking.getStartDate()));
	        endDateString = df.format(new Date(booking.getEndDate()));
	        ownerUsername = booking.getOwnerUsername();
        }
        
    	String title = "Appointment Requested";
    	String message = ownerUsername + " has requested your sitting services for their pets: " + sitterPetString + " from " + startDateString + " to " + endDateString;
    	return new SitterNotification(NotificationType.REQUEST, bookingID, title, message);
    }
    
    public static SitterNotification createAcceptNotification(String bookingID, Booking booking) {
    	String sitterPetString = "";
        String endDateString = "";
        String startDateString = "";
        String ownerUsername = "";
        if (booking != null) {
	        sitterPetString = booking.getPetsSit().stream()
	      		  .map(PetDto::printNameAndType)
	      		  .collect(Collectors.joining(", "));
	
	        startDateString = df.format(new Date(booking.getStartDate()));
	        endDateString = df.format(new Date(booking.getEndDate()));
	        ownerUsername = booking.getOwnerUsername();
        }

    	String title = "Appointment Accepted";
    	String message = "You have accepted " + ownerUsername + "'s request for your sitting services for their pets: " + sitterPetString + " from " + startDateString + " to " + endDateString;
    	return new SitterNotification(NotificationType.ACCEPT, bookingID, title, message);
    }

    public static SitterNotification createDeclineNotification(String bookingID, Booking booking) {
    	String sitterPetString = "";
        String endDateString = "";
        String startDateString = "";
        String ownerUsername = "";
        if (booking != null) {
	        sitterPetString = booking.getPetsSit().stream()
	      		  .map(PetDto::printNameAndType)
	      		  .collect(Collectors.joining(", "));
	
	        startDateString = df.format(new Date(booking.getStartDate()));
	        endDateString = df.format(new Date(booking.getEndDate()));
	        ownerUsername = booking.getOwnerUsername();
        }
        
    	String title = "Appointment Declined";
    	String message = "You have declined " + ownerUsername + "'s request for your sitting services for their pets: " + sitterPetString + " from " + startDateString + " to " + endDateString;
    	return new SitterNotification(NotificationType.DECLINE, bookingID, title, message);
    }

    public static SitterNotification createMessageNotification(String bookingID, String ownerUsername, String message) {      
    	String title = "Message from " + ownerUsername;
    	return new SitterNotification(NotificationType.MESSAGE, bookingID, title, message);
    }
}

package petfinder.site.common.user;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.booking.Booking;
import petfinder.site.common.pet.PetDto;

public class Notification {
    public enum NotificationType { OWNER_REQUEST, SITTER_REQUEST, OWNER_ACCEPT, SITTER_ACCEPT }
    
    public static DateFormat df = new SimpleDateFormat("EEE, MMM d, yyyy");
    
    private NotificationType notificationType;
    private String message;
    private Booking booking;
    private boolean isRead;
    private long notificationDate;

    public Notification(){
    	this.notificationType = null;
        this.booking = null;
        this.message = "";
        this.isRead = false;
        this.notificationDate = System.currentTimeMillis();
    }

    public Notification(NotificationType notificationType, Booking booking){
    	this.notificationType = notificationType;
        this.booking = booking; // booking this notification is connected to

        String petString = "";
        String sitterPetString = "";
        String endDateString = "";
        String startDateString = "";
        String sitterUsername = "";
        String ownerUsername = "";
        if (booking != null) {
	        petString = booking.getPetsSit().stream()
	    		  .map(PetDto::getName)
	    		  .collect(Collectors.joining(", "));
	        sitterPetString = booking.getPetsSit().stream()
	      		  .map(PetDto::printNameAndType)
	      		  .collect(Collectors.joining(", "));
	
	        startDateString = df.format(new Date(booking.getStartDate()));
	        endDateString = df.format(new Date(booking.getEndDate()));
	        sitterUsername = booking.getSitterUsername();
	        ownerUsername = booking.getOwnerUsername();
        }
        
        switch(notificationType) {
        case OWNER_REQUEST:
        	this.message = "You have requested " + sitterUsername + " to sit your pet(s): " + petString + "from " + startDateString + " to " + endDateString;
        	break;
        case SITTER_REQUEST:
        	this.message = ownerUsername + " has requested your sitting services for their pets: " + sitterPetString + "from " + startDateString + " to " + endDateString;
        	break;
        case OWNER_ACCEPT:
        	this.message = sitterUsername + " has accepted your request to sit your pet(s): " + petString + "from " + startDateString + " to " + endDateString;
        	break;
        case SITTER_ACCEPT:
        	this.message = "You have accepted " + ownerUsername + "'s request for your sitting services for their pets: " + sitterPetString + "from " + startDateString + " to " + endDateString;
        	break;
        default:
        	this.message = "";
        }
        this.isRead = false; // if the booking should be marked as having been read before
        this.notificationDate = System.currentTimeMillis();
    }

    public NotificationType getNotificationType() { return notificationType; }
    public void setNotificationType(NotificationType notificationType) { this.notificationType = notificationType; }
    
    public Booking getBooking() { return booking; }
    public void setBooking(Booking book) { this.booking = book; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean getIsRead() { return isRead; }
    public void setIsRead(boolean isRead) { this.isRead = isRead; }
    
    public long getNotificationDate() { return notificationDate; }
    public void setNotificationDate(long notificationDate) { this.notificationDate = notificationDate; }

    @Override
    public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return super.toString();
        }
    }
}

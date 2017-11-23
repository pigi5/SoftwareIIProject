package petfinder.site.common.user;

import java.util.Date;
import java.util.stream.Collectors;

import petfinder.site.common.booking.Booking;
import petfinder.site.common.pet.PetDto;

public class OwnerNotification extends Notification {
    public OwnerNotification(NotificationType notificationType, Booking booking) {
    	super(notificationType, booking);
    	
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
        
        switch(notificationType) {
        case REQUEST:
        	this.title = "Appointment Requested";
        	this.message = "You have requested " + sitterUsername + " to sit your pet(s): " + petString + " from " + startDateString + " to " + endDateString;
        	break;
        case ACCEPT:
        	this.title = "Appointment Accepted";
        	this.message = sitterUsername + " has accepted your request to sit your pet(s): " + petString + " from " + startDateString + " to " + endDateString;
        	break;
        case DECLINE:
        	this.title = "Appointment Declined";
        	this.message = sitterUsername + " has declined your request to sit your pet(s): " + petString + " from " + startDateString + " to " + endDateString;
        	break;
        case COMPLETE:
        	this.title = "Appointment Complete";
        	this.message = "Your appointment with " + sitterUsername + " is over. Please rate their performance.";
        	break;
        default:
        	this.title = "No Content";
        	this.message = "No Content";
        }
    }
}

package petfinder.site.common.user;

import java.util.Date;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.booking.Booking;
import petfinder.site.common.pet.PetDto;

public class SitterNotification extends Notification {
	
	public SitterNotification() {}
	
    public SitterNotification(NotificationType notificationType, String bookingID, Booking booking) {
    	super(notificationType, bookingID);
    	
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
        
        switch(notificationType) {
        case REQUEST:
        	this.title = "Appointment Requested";
        	this.message = ownerUsername + " has requested your sitting services for their pets: " + sitterPetString + " from " + startDateString + " to " + endDateString;
        	break;
        case ACCEPT:
        	this.title = "Appointment Accepted";
        	this.message = "You have accepted " + ownerUsername + "'s request for your sitting services for their pets: " + sitterPetString + " from " + startDateString + " to " + endDateString;
        	break;
        case DECLINE:
        	this.title = "Appointment Declined";
        	this.message = "You have declined " + ownerUsername + "'s request for your sitting services for their pets: " + sitterPetString + " from " + startDateString + " to " + endDateString;
        	break;
        default:
        	this.title = "No Content";
        	this.message = "No Content";
        }
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
}

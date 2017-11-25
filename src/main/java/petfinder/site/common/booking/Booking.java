package petfinder.site.common.booking;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.pet.PetDto;

import java.util.LinkedList;
import java.util.List;

public class Booking {
    private String ownerUsername;
    private String sitterUsername;
    private List<PetDto> petsSit;
    private boolean sitterApprove;
    private boolean sitterDecline;
    private double ownerRating;
    private long startDate;
    private long endDate;
    private boolean ended;

    public Booking(){
        this.petsSit = new LinkedList<PetDto>();
        this.ownerRating = -1;
        /*
        this.sitterApprove = false;
        this.startDate = 0;
        this.endDate = 0;
        ownerUsername = null;
        sitterUsername = null;
        */

    }

    public Booking(String owner, String sitter, List<PetDto> pets){
        this.ownerUsername = owner;
        this.sitterUsername = sitter;
        this.petsSit = pets;
        this.sitterApprove = false;
        this.sitterDecline = false;
        this.ownerRating = -1;
        this.ended = false;
    }

    public Booking(String ownerUsername, String sitterUsername, List<PetDto> petsSit, long startDate, long endDate, boolean sitterApprove, boolean sitterDecline, double ownerRating, boolean ended){
        this.ownerUsername = ownerUsername;
        this.sitterUsername = sitterUsername;
        this.petsSit = petsSit;
        this.startDate = startDate;
        this.endDate = endDate;
        this.sitterApprove = sitterApprove;
        this.sitterDecline = sitterDecline;
        this.ownerRating = ownerRating;
        this.ended = ended;
    }

    public boolean shouldEnd() {
    	return !ended && endDate < System.currentTimeMillis();
    }
    
    //Setters
    public void setStartDate(long startDate)			{ this.startDate = startDate; }
    public void setEndDate(long endDate)				{ this.endDate = endDate; }
    public void setOwnerUsername(String ownerUsername) 	{ this.ownerUsername = ownerUsername; }
    public void setSitterUsername(String sitterUsername){ this.sitterUsername = sitterUsername; }
    public void setPetsSit(List<PetDto> petsSit) 		{ this.petsSit = petsSit; }
    public void setSitterApprove(boolean sitterApprove) { this.sitterApprove = sitterApprove; }
    public void setSitterDecline(boolean sitterDecline) { this.sitterDecline = sitterDecline; }
    public void setOwnerRating(double ownerRating) 		{ this.ownerRating = ownerRating; }
    public void setEnded(boolean ended) 				{ this.ended = ended; }

    //getters
    public long getStartDate()							{ return this.startDate; }
    public long getEndDate()							{ return this.endDate; }
    public String getOwnerUsername() 					{ return ownerUsername; }
    public String getSitterUsername() 					{ return sitterUsername; }
    public List<PetDto> getPetsSit() 					{ return petsSit; }
    public boolean getSitterApprove() 					{ return sitterApprove; }
    public boolean getSitterDecline() 					{ return sitterDecline; }
    public double getOwnerRating() 						{ return ownerRating; }
    public boolean getEnded()		 					{ return ended; }

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

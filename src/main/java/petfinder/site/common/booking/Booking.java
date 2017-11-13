package petfinder.site.common.booking;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.pet.PetDto;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class Booking {
    private String ownerUsername;
    private String sitterUsername;
    private List<PetDto> petsSit;
    private boolean sitterApprove;
    private long startDate;
    private long endDate;

    public Booking(){
        this.petsSit = new LinkedList<PetDto>();
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
    }

    public Booking(String ownerUsername, String sitterUsername, List<PetDto> petsSit, long startDate, long endDate, boolean sitterApprove){
        this.ownerUsername = ownerUsername;
        this.sitterUsername = sitterUsername;
        this.petsSit = petsSit;
        this.startDate = startDate;
        this.endDate = endDate;
        this.sitterApprove = sitterApprove;
    }

    //Setters
    public void setStartDate(long startDate){ this.startDate = startDate; }
    public void setEndDate(long endDate){
        this.endDate = endDate;
    }
    public void setOwnerUsername(String ownerUsername) { this.ownerUsername = ownerUsername; }
    public void setSitterUsername(String sitterUsername) { this.sitterUsername = sitterUsername; }
    public void setSitterApprove(boolean sitterApprove) {this.sitterApprove = sitterApprove; }
    public void setPetsSit(List<PetDto> petsSit) {this.petsSit = petsSit; }

    //getters
    public long getStartDate(){return this.startDate;}
    public long getEndDate(){return this.endDate;}
    public String getOwnerUsername() {return ownerUsername; }
    public String getSitterUsername() {return sitterUsername; }
    public List<PetDto> getPetsSit() {return petsSit; }
    public boolean getSitterApprove() {return sitterApprove; }

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

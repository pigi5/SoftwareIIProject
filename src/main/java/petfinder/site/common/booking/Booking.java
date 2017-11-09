package petfinder.site.common.booking;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.pet.PetDto;

import java.util.Collections;
import java.util.List;

public class Booking {
    private String ownerUsername;
    private String sitterUsername;
    private List<PetDto> petsSit;
    private Boolean sitterApprove;
    private long startDate;
    private long endDate;

    public Booking(){
        this.petsSit = Collections.emptyList();
        this.sitterApprove = false;
        this.startDate = 0;
        this.endDate = 0;
        ownerUsername = null;
        sitterUsername = null;
    }

    public Booking(String owner, String sitter, List<PetDto> pets){
        this.ownerUsername = owner;
        this.sitterUsername = sitter;
        this.petsSit = pets;
    }

    public void setStartDate(long startDate){
        this.startDate = startDate;
    }
    public long getStartDate(){return this.startDate;}
    public long getEndDate(){return this.endDate;}
    public void setEndDate(long endDate){
        this.endDate = endDate;
    }

    public String getOwnerUsername() {return ownerUsername; }
    public void setOwnerUsername(String ownerName) { this.ownerUsername = ownerName; }

    public String getSitterUsername() {return ownerUsername; }
    public void setSitterUsername(String sitterName) { this.ownerUsername = sitterName; }

    public List<PetDto> getPetsSit() {return petsSit; }
    public void setPetsSit(List<PetDto> petsSit) {this.petsSit = petsSit; }

    public Boolean getSitterApprove() {return sitterApprove; }
    public void setSitterApprove(Boolean sitterApprove) {this.sitterApprove = sitterApprove; }

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

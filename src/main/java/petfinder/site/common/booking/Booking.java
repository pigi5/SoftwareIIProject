package petfinder.site.common.booking;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.pet.PetDto;

import java.util.Collections;
import java.util.List;

public class Booking {
    private String ownerName;
    private String sitterName;
    private List<PetDto> petsSit;
    private Boolean sitterApprove;
    private long startDate;

    public Booking(){
        this.petsSit = Collections.emptyList();
        this.sitterApprove = false;
    }

    public Booking(String owner, String sitter, List<PetDto> pets,
                   List<String> Days){
        this.ownerName = owner;
        this.sitterName = sitter;
        this.petsSit = pets;
    }

    public String getOwnerName() {return ownerName; }
    public void setOwnerName(String ownerName) {this.ownerName = ownerName; }

    public String getSitterName() {return sitterName; }
    public void setSitterName(String sitterName) {this.sitterName = sitterName; }

    public List<PetDto> getPetsSit() {return petsSit; }
    public void setPetsSit(List<PetDto> petsSit) {this.petsSit = petsSit; }

    public Boolean getSitterApprove() {return sitterApprove; }
    public void setSitterApprove(Boolean sitterApprove) {this.sitterApprove = sitterApprove; }

    public Boolean isApproved(){return (this.sitterApprove);}

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

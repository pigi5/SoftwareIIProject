package petfinder.site.common.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.pet.PetDto;

import java.util.Collections;
import java.util.List;

public class Booking {
    private String OwnerName;
    private String SitterName;
    private List<PetDto> PetsSit;
    private List<String> DaysSit;
    private Boolean OwnerApprove;
    private Boolean SitterApprove;

    public Booking(){
        this.PetsSit = Collections.emptyList();
        this.DaysSit = Collections.emptyList();
        this.OwnerApprove = true;
        this.SitterApprove = false;
    }

    public Booking(String Owner, String Sitter, List<PetDto> Pets,
                   List<String> Days){
        this.OwnerName = Owner;
        this.SitterName = Sitter;
        this.PetsSit = Pets;
        this.DaysSit = Days;
        this.OwnerApprove = true;
    }

    public String getOwnerName() {return OwnerName; }
    public void setOwnerName(String ownerName) {OwnerName = ownerName; }

    public String getSitterName() {return SitterName; }
    public void setSitterName(String sitterName) {SitterName = sitterName; }

    public List<PetDto> getPetsSit() {return PetsSit; }
    public void setPetsSit(List<PetDto> petsSit) {PetsSit = petsSit; }

    public List<String> getDaysSit() {return DaysSit; }
    public void setDaysSit(List<String> daysSit) {DaysSit = daysSit; }

    public Boolean getOwnerApprove() {return OwnerApprove; }
    public void setOwnerApprove(Boolean ownerApprove) {OwnerApprove = ownerApprove; }

    public Boolean getSitterApprove() {return SitterApprove; }
    public void setSitterApprove(Boolean sitterApprove) {SitterApprove = sitterApprove; }

    public Boolean isApproved(){return (OwnerApprove && SitterApprove);}

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

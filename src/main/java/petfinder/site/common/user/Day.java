package petfinder.site.common.user;

public class Day {
    private String day;
    private Boolean available;

    //Constructors
    public Day(){
    }
    public Day(String day, Boolean available){
        this.day = day;
        this.available = available;
    }

    //Setters
    public void setAvailabile(){
        this.available = true;
    }
    public void setUnavailable(){
        this.available = false;
    }

    //Getters
    public Boolean getAvailability(){
        return this.available;
    }
}

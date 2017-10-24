package petfinder.site.common.user;
import petfinder.site.common.user.Day;
import java.util.ArrayList;

public class Week {
    private ArrayList<Day> weekDays;

    //Constructors
    public Week(){
        weekDays.add(new Day("Sunday", false));
        weekDays.add(new Day("Monday", false));
        weekDays.add(new Day("Tuesday", false));
        weekDays.add(new Day("Wednesday", false));
        weekDays.add(new Day("Thursday", false));
        weekDays.add(new Day("Friday", false));
        weekDays.add(new Day("Saturday", false));
    }

    //Setters
    public void setAvailable(Integer index){
        this.weekDays.get(index).setAvailabile();
    }
    public void setUnavailable(Integer index){
        this.weekDays.get(index).setUnavailable();
    }
    public void setTotalAvailability(){
        for(int i = 0; i < this.weekDays.size(); i++){
            this.weekDays.get(i).setAvailabile();
        }
    }
    public void setTotalUnavailable(){
        for(int i = 0; i < this.weekDays.size(); i++){
            this.weekDays.get(i).setUnavailable();
        }
    }

    //Getters
    public Boolean getAvailability(Integer index){
        return this.weekDays.get(index).getAvailability();
    }
}

package petfinder.site.common.booking;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Notification {
    private long id;
    private Booking booking;
    private String message;

    public Notification(){
        this.id = 1; //Can be a randomly generated unique number
    }

    public Notification(long id, Booking booking, String msg){
        this.booking = booking; //booking this notification is connected to
        this.message = msg; //The message you want to send to sitter or owner
    }

    public long getId() {return id; }
    public void setId(long id) {this.id = id; }

    public Booking getBooking() {return booking; }
    public void setBooking(Booking book) {this.booking = book; }

    public String getMessage() {return message; }
    public void setMessage(String message) {this.message = message; }

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

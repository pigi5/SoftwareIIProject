package petfinder.site.common.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.booking.Booking;

public class Notification {
    private Booking booking;
    private String message;

    public Notification(){
        this.booking = null;
        this.message = "";
    }

    public Notification(Booking booking, String msg){
        this.booking = booking; // booking this notification is connected to
        this.message = msg; // The message you want to send to sitter or owner
    }

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

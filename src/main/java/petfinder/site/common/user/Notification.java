package petfinder.site.common.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.pet.PetDto;

import java.util.List;

public class Notification {
    private long ID;
    private Booking Book;
    private String Message;

    public Notification(){
        this.ID = 1; //Can be a randomly generated unique number
    }

    public Notification(long ID, Booking Book, String Msg){
        this.Book = Book; //Booking this notification is connected to
        this.Message = Msg; //The message you want to send to sitter or owner
    }

    public long getID() {return ID; }
    public void setID(long ID) {this.ID = ID; }

    public Booking getBook() {return Book; }
    public void setBook(Booking book) {Book = book; }

    public String getMessage() {return Message; }
    public void setMessage(String message) {Message = message; }

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

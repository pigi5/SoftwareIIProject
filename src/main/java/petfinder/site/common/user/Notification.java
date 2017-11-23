package petfinder.site.common.user;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.booking.Booking;

public abstract class Notification {
    public enum NotificationType { REQUEST, ACCEPT, DECLINE, COMPLETE }
    
    public static DateFormat df = new SimpleDateFormat("EEE, MMM d, yyyy");
    
    protected NotificationType notificationType;
    protected String title;
    protected String message;
    protected Booking booking;
    protected boolean isRead;
    protected long notificationDate;

    public Notification() {
    	this.notificationType = null;
        this.booking = null;
        this.message = "";
        this.isRead = false;
        this.notificationDate = System.currentTimeMillis();
    }

    public Notification(NotificationType notificationType, Booking booking) {
    	this.notificationType = notificationType;
        this.booking = booking; // booking this notification is connected to

        this.isRead = false; // if the booking should be marked as having been read before
        this.notificationDate = System.currentTimeMillis();
    }

    public NotificationType getNotificationType() { return notificationType; }
    public void setNotificationType(NotificationType notificationType) { this.notificationType = notificationType; }
    
    public Booking getBooking() { return booking; }
    public void setBooking(Booking book) { this.booking = book; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean getIsRead() { return isRead; }
    public void setIsRead(boolean isRead) { this.isRead = isRead; }
    
    public long getNotificationDate() { return notificationDate; }
    public void setNotificationDate(long notificationDate) { this.notificationDate = notificationDate; }

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

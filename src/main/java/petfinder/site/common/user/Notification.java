package petfinder.site.common.user;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public abstract class Notification {
    public enum NotificationType { REQUEST, ACCEPT, DECLINE, COMPLETE, MESSAGE }
    
    public static DateFormat df = new SimpleDateFormat("EEE, MMM d, yyyy");
    
    protected NotificationType notificationType;
    protected String title;
    protected String message;
    protected String bookingID;
    protected boolean isRead;
    protected long notificationDate;

    public Notification() {}

    public Notification(NotificationType notificationType, String bookingID, String title, String message) {
    	this.notificationType = notificationType;
        this.bookingID = bookingID; // booking this notification is connected to
        this.title = title;
        this.message = message;
        this.isRead = false; // if the booking should be marked as having been read before
        this.notificationDate = System.currentTimeMillis();
    }

    public NotificationType getNotificationType() { return notificationType; }
    public void setNotificationType(NotificationType notificationType) { this.notificationType = notificationType; }
    
    public String getBookingID() { return bookingID; }
    public void setBookingID(String bookingID) { this.bookingID = bookingID; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean getIsRead() { return isRead; }
    public void setIsRead(boolean isRead) { this.isRead = isRead; }
    
    public long getNotificationDate() { return notificationDate; }
    public void setNotificationDate(long notificationDate) { this.notificationDate = notificationDate; }
}

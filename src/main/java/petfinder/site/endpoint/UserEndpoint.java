package petfinder.site.endpoint;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.*;

import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.Notification;
import petfinder.site.common.user.OwnerNotification;
import petfinder.site.common.user.SitterNotification;

import java.text.SimpleDateFormat;
import java.util.*;
import java.io.IOException;
import java.text.DateFormat;


/**
 * Created by jlutteringer on 8/23/17.
 */
//uses dao to pull data. called from frontend

@RestController
@RequestMapping(value = "/api/users")
public class UserEndpoint {
    public static DateFormat availabilityFormat = new SimpleDateFormat("EEEE");
	
    @Autowired
    static final ObjectMapper mapper = new ObjectMapper();

    @Qualifier("userDetailsService")
    static UserDetailsService userDetailsService;

    // Returns user information for a given username
    @RequestMapping(path = "/exists", method = RequestMethod.GET)
    public static ResponseEntity<String> userExists(@RequestParam(name = "username") String username){
        return EndpointUtil.getQuery("/users/user/" + username, false, false);
    }

    // Returns user information for a given username
    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public static ResponseEntity<String> getUser(@RequestParam(name = "username") String username){
        return EndpointUtil.getQuery("/users/user/" + username, true, false);
    }

    // Returns user information if username and password are correct
    @RequestMapping(path = "/authuser", method = RequestMethod.GET)
    public static ResponseEntity<String> searchUserPass(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
	    return EndpointUtil.searchOneQuery("/users/user", "username:" + username + " AND password:" + password, false, ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null), ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
	}
    
    // Returns "all" users (1000)
    // Note: to actually get all users, we would need to use pagination via https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html
    @RequestMapping(path = "/allusers", method = RequestMethod.GET)
    public static ResponseEntity<String> getAllUsers(){
	    return EndpointUtil.searchMultipleQuery("/users/user", null, 1000, false, false);
	}

	@RequestMapping(path = "/deleteUser", method = RequestMethod.DELETE)
    public static ResponseEntity<String> deleteUser(@RequestParam(name = "username") String username){
        String esEndpoint = "/users/user/" + username;
        return EndpointUtil.remove(esEndpoint);
    }

	@RequestMapping(path = "/match", method = RequestMethod.GET)
    public static ResponseEntity<String> matchOwnerSitter(@RequestParam(name = "startDate") long date, @RequestParam(name = "zipCode") int zipCode, @RequestParam(name = "petTypes[]") String petString) {
        //TODO: filter out self (will need to add an ownerID to the parameters)
		
		//Formats pet preference query string
        String preferences = "";
        List<String> petTypes = Arrays.asList(petString.split(","));
        System.out.println("petTypes: " + petTypes.toString());
        for(int i = 0; i < petTypes.size(); i++){
            if(i == petTypes.size() - 1) {
                preferences += petTypes.get(i);
            }
            else{
                preferences += petTypes.get(i) + " AND ";
            }
        }

        //System.out.println(preferences);

        //get date in ms
        Date d = new Date(date);
        String dayAvailable = availabilityFormat.format(d);

        return EndpointUtil.searchMultipleQuery("/users/user", "petPreferences: " + preferences + " AND zipCode: " + zipCode + " AND availability: " + dayAvailable, 1000, false, false);
    }

    @RequestMapping(path = "/add", method = RequestMethod.PUT)
    public static ResponseEntity<String> createOwner(@RequestBody UserDto user) {
    	try {
			return EndpointUtil.indexQuery("/users/user/", user.getUsername(), mapper.writeValueAsString(user), true);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }

    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public static ResponseEntity<String> updateUser(@RequestParam(name = "username") String username, @RequestBody HashMap<String, Object> partialDoc){
    	try {
			return EndpointUtil.updateQuery("/users/user/" + username, mapper.writeValueAsString(partialDoc));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }

    @RequestMapping(path = "/getLoggedIn", method = RequestMethod.GET)
    public static ResponseEntity<String> getLoggedIn(){
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return getUser(user.getUsername());
        }catch(java.lang.ClassCastException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /*
    @RequestMapping(path = "/addRating", method = RequestMethod.POST)
    public static ResponseEntity<String> addRating(@RequestParam(name = "username") String username, @RequestParam(name = "rating") long rating) {
        ResponseEntity<String> getUserResponse = getUser(username);
        try {
            UserDto user = mapper.readValue(getUserResponse.getBody(), UserDto.class);
            user.addRating(rating);
            return reindexUser(user.getUsername(), user);
        }catch(IOException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    */

	
	public static ResponseEntity<String> addUserNotification(String username, Notification notification) throws IOException {
		// Get user in memory
        ResponseEntity<String> getUserResponse = getUser(username);
        UserDto user = mapper.readValue(getUserResponse.getBody(), UserDto.class);
        
        // Add the notification
        if (notification instanceof OwnerNotification) {
        	user.getOwnerNotifications().add(0, (OwnerNotification) notification);
        } else if (notification instanceof SitterNotification) {
        	user.getSitterNotifications().add(0, (SitterNotification) notification);
        }
        
        // Reindex user
        return reindexUser(username, user);
	}
	
	public static ResponseEntity<String> reindexUser(String username, UserDto user) throws JsonProcessingException {
		return EndpointUtil.indexQuery("/users/user/", username, mapper.writeValueAsString(user), false);
	}
}
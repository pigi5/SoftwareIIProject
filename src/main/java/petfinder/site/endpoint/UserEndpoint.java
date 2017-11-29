package petfinder.site.endpoint;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.Notification;
import petfinder.site.common.user.OwnerNotification;
import petfinder.site.common.user.SitterNotification;
import petfinder.site.WebSecurityConfiguration;


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

    //@Autowired
    //private PasswordEncoder passwordEncoder;

    @Qualifier("userDetailsService")
    static UserDetailsService userDetailsService;

    // Returns user information for a given username
    @RequestMapping(path = "/exists", method = RequestMethod.GET)
    public static ResponseEntity<String> userExists(@RequestParam(name = "username") String username) {
        return EndpointUtil.getQuery("/users/user/" + username, false, false);
    }

    // Returns user information for a given username
    public static ResponseEntity<String> getUser(String username) {
        return EndpointUtil.getQuery("/users/user/" + username, true, false);
    }

	@RequestMapping(path = "/match", method = RequestMethod.GET)
    public static ResponseEntity<String> matchOwnerSitter(@RequestParam(name = "startDate") long date, @RequestParam(name = "zipCode") int zipCode, @RequestParam(name = "petTypes[]") String petString) {
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
        
        //get date in ms
        Date d = new Date(date);
        String dayAvailable = availabilityFormat.format(d);

        //System.out.println(preferences);

        // Uncomment code below for nearby zip codes
        /*
    	// TODO: replace static values with ones from API call
    	String zipCodeList[] = {"76798", "76706", "76701", "76702", "76704"};
        
        try {
        	String esQuery = "NOT username:" + getCurrentUsername() + " AND petPreferences: " + preferences + " AND (";
	        for (int i = 0; i < zipCodeList.length; i++) {
	        	esQuery += "zipCode: " + zipCodeList[i];
	        	if (i < zipCodeList.length - 1) {
	        		esQuery += " OR ";
	        	}
	        }
	        esQuery += ") AND availability: " + dayAvailable;
	        
	        return EndpointUtil.searchMultipleQuery("/users/user", esQuery, 1000, false, false);
        } catch (NotAuthenticatedException e) {
			return e.getNewResponseEntity();
		}
        //*/

        // Comment out below code for nearby zip codes
        //*
        try {
			return EndpointUtil.searchMultipleQuery("/users/user", "NOT username:" + getCurrentUsername() + " AND petPreferences: " + preferences + " AND zipCode: " + zipCode + " AND availability: " + dayAvailable, 1000, false, false);
		} catch (NotAuthenticatedException e) {
			return e.getNewResponseEntity();
		}
		//*/
    }

    @RequestMapping(path = "/add", method = RequestMethod.PUT)
    public static ResponseEntity<String> createOwner(@RequestBody UserDto user) {
        PasswordEncoder passwordEncoder = WebSecurityConfiguration.passwordEncoder();
        System.out.println(user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
    	try {
			return EndpointUtil.indexQuery("/users/user/", user.getUsername(), mapper.writeValueAsString(user), true);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }

    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public static ResponseEntity<String> updateUser(@RequestBody HashMap<String, Object> partialDoc){
    	try {
			return EndpointUtil.updateQuery("/users/user/" + getCurrentUsername(), mapper.writeValueAsString(partialDoc));
		} catch (NotAuthenticatedException e) {
			return e.getNewResponseEntity();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }

    @RequestMapping(path = "/refresh", method = RequestMethod.GET)
    public static ResponseEntity<String> refreshUser() {
    	try {
			return getUser(getCurrentUsername());
		} catch (NotAuthenticatedException e) {
			return e.getNewResponseEntity();
		}
    }
    
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
	
	public static String getCurrentUsername() throws NotAuthenticatedException {
		try {
	        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        return user.getUsername();
		} catch (NullPointerException | ClassCastException e) {
			throw new NotAuthenticatedException(e);
		}
	}
}
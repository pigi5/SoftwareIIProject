package petfinder.site.endpoint;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.sun.org.apache.regexp.internal.RE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.*;

import petfinder.site.MyUserDetailsService;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.booking.Booking;
import petfinder.site.common.user.Notification;
import petfinder.site.common.pet.PetType;

import java.text.SimpleDateFormat;
import java.util.*;
import java.text.DateFormat;


/**
 * Created by jlutteringer on 8/23/17.
 */
//uses dao to pull data. called from frontend

@RestController
@RequestMapping(value = "/api/users")
public class UserEndpoint {
    @Autowired

    static final ObjectMapper mapper = new ObjectMapper();

    @Qualifier("userDetailsService")
    static UserDetailsService userDetailsService;

    // Returns user information for a given username
    @RequestMapping(path = "/exists", method = RequestMethod.GET)
    public static ResponseEntity<String> userExists(@RequestParam(name = "username") String username){
        return EndpointUtil.getQuery("/users/user/" + username, false);
    }

    // Returns user information for a given username
    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public static ResponseEntity<String> getUser(@RequestParam(name = "username") String username){
        return EndpointUtil.getQuery("/users/user/" + username, true);
    }

    // Returns user information if username and password are correct
    @RequestMapping(path = "/authuser", method = RequestMethod.GET)
    public static ResponseEntity<String> searchUserPass(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
	    return EndpointUtil.searchOneQuery("/users/user", "username:" + username + " AND password:" + password, ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null), ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
	}
    
    // Returns "all" users (1000)
    // Note: to actually get all users, we would need to use pagination via https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html
    @RequestMapping(path = "/allusers", method = RequestMethod.GET)
    public static ResponseEntity<String> getAllUsers(){
	    return EndpointUtil.searchMultipleQuery("/users/user", null, 1000);
	}

	@RequestMapping(path = "/match", method = RequestMethod.GET)
    public static ResponseEntity<String> matchOwnerSitter(@RequestParam(name = "startDate") long date, @RequestParam(name = "zipCode") int zipCode, @RequestParam(name = "petTypes[]") String petString) {


        //TODO-Ford, need to handle if no pets on front end to pass an empty string array, otherwise it doesnt send pettypes in param and gets a failure
        //TODO-Ford, when we add a pet, we need to restrict pet type to Dog, Cat, etc. rn the user can enter any old string for type
        //TODO-Ford, make the list display returned users


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
        DateFormat df = new SimpleDateFormat("EEEE");
        String dayAvailable = df.format(d);



        return EndpointUtil.searchMultipleQuery("/users/user", "petPreferences: " + preferences + " AND zipCode: " + zipCode + " AND availability: " + dayAvailable, 1000);
    }

    @RequestMapping(path = "/book", method = RequestMethod.POST)
    public static ResponseEntity<String> createBooking(@RequestBody Booking booking){

        System.out.println(booking.toString());

        String petString = "";
        String sitterPetString = "";
        for(int i = 0; i < booking.getPetsSit().size(); i++){
            petString += booking.getPetsSit().get(i).getName() + ", ";
            sitterPetString += booking.getPetsSit().get(i).getName() + ", type: " + booking.getPetsSit().get(i).getType().toString() + ", ";
        }
        long startDate = booking.getStartDate();
        Date d = new Date(startDate);
        DateFormat df = new SimpleDateFormat("EEE, MMM d, yyyy");
        String startDateString = df.format(d);

        long endDate = booking.getEndDate();
        Date e = new Date(endDate);
        String endDateString = df.format(e);

        //add notification to owner
        try{
            //gets the owner object
            ResponseEntity<String> getUserResponse = getUser(booking.getOwnerUsername());
            UserDto owner = mapper.readValue(getUserResponse.getBody().toString(), UserDto.class);
            //reads the notifications that he/she already has
            List<Notification> ownerNotifications = owner.getNotifications();
            //creates a string of pet names involved in the booking


            //adds a new notification to be added to list
            Notification toAdd = new Notification(booking, "You have requested " + booking.getSitterUsername() + " to sit your pet(s): " + petString + "from " + startDateString + " to " + endDateString);
            ownerNotifications.add(toAdd);
            owner.setNotifications(ownerNotifications);
            //updates user
            EndpointUtil.indexQueryPost("/users/user/" + owner.getUsername(), mapper.writeValueAsString(owner));
        }catch(Exception ex){
            ex.printStackTrace();
        }

        //add notification to sitter
        try{
            ResponseEntity<String> getSitterResponse = getUser(booking.getSitterUsername());
            UserDto sitter = mapper.readValue(getSitterResponse.getBody().toString(), UserDto.class);
            List<Notification> sitterNotifications = sitter.getNotifications();
            Notification toAdd = new Notification(booking, booking.getOwnerUsername() + " has requested your sitting services for their pets: " + sitterPetString + "from " + startDateString + " to " + endDateString);
            sitterNotifications.add(toAdd);
            sitter.setNotifications(sitterNotifications);
            EndpointUtil.indexQueryPost("/users/user/" + sitter.getUsername(), mapper.writeValueAsString(sitter));
        }catch(Exception ex){
            ex.printStackTrace();
        }

        try{
            ResponseEntity<String> response = EndpointUtil.indexQueryPost("/bookings/booking", mapper.writeValueAsString(booking));
            return response;
        } catch (JsonProcessingException ex){
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @RequestMapping(path = "/add", method = RequestMethod.PUT)
    public static ResponseEntity<String> createOwner(@RequestBody UserDto user) {
    	try {
			return EndpointUtil.indexQuery("/users/user/" + user.getUsername(), mapper.writeValueAsString(user));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }

    @RequestMapping(path = "/updatePreferences", method = RequestMethod.POST)
    public static ResponseEntity<String> updatePreferences(@RequestParam(name = "username") String username, @RequestParam(name = "availability") List<String> availability, @RequestParam(name = "petPreferences") List<PetType> petTypes){
        System.out.println("Username: " + username + " availability: " + availability.toString() + " petTypes: " + petTypes.toString());
        return ResponseEntity.status(HttpStatus.OK).body(null);
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

}
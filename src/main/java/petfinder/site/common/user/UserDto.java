package petfinder.site.common.user;
import petfinder.site.common.pet.PetDto;

import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.GrantedAuthority;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto implements UserDetails {
	private String name;
	private String email;
	private String username;
	private String password;
	private List<GrantedAuthority> authorities;
	private int zipCode;
	private List<PetDto> pets;
	private List<PetDto.PetType> petPreferences;
	private List<String> availability;
	private List<OwnerNotification> ownerNotifications;
	private List<SitterNotification> sitterNotifications;
	private double rating;
	private int numberOfRatings;
	private boolean accountNonExpired;
	private boolean accountNonLocked;
	private boolean credentialsNonExpired;
	private boolean enabled;

	//Constructors
	//This is a dummy constructor used by elasticsearch DO NOT DELETE
	public UserDto(){
		this.pets = new LinkedList<PetDto>();
		this.petPreferences = new LinkedList<PetDto.PetType>();
		this.availability = new LinkedList<String>();
		this.ownerNotifications = new LinkedList<OwnerNotification>();
		this.sitterNotifications = new LinkedList<SitterNotification>();

		this.authorities = new LinkedList<GrantedAuthority>();
		this.rating = 0;
		this.numberOfRatings = 0;
		this.accountNonExpired = true;
		this.accountNonLocked = true;
		this.credentialsNonExpired = true;
		this.enabled = true;
	}
	//Setters
	public void setName(String name) 		{this.name = name;}
	public void setUsername(String username){this.username = username;}
	public void setPassword(String password){this.password = password;}
	public void setEmail(String email) 		{this.email = email;}
	public void setZipCode(int zipCode)		{this.zipCode = zipCode;}
	public void setPets(List<PetDto> pets) 	{this.pets = pets;}
	public void setPetPreferences(List<PetDto.PetType> petPreferences){
		this.petPreferences = new LinkedList<PetDto.PetType>(petPreferences);
	}
	public void setRating(double rating) {this.rating = rating;}
	public void setNumberOfRatings(int numberOfRatings) {this.numberOfRatings = numberOfRatings;}
	public void setAvailability(List<String> availability) {this.availability = availability;}
	public void setOwnerNotifications(List<OwnerNotification> ownerNotifications) {this.ownerNotifications = ownerNotifications;}
	public void setSitterNotifications(List<SitterNotification> sitterNotifications) {this.sitterNotifications = sitterNotifications;}

	//Getters
	public String getName() 								{return name;}
	@Override
	public String getUsername() 							{return username;}
	@Override
	public String getPassword() 							{return password;}
	@Override
	public boolean isAccountNonExpired()					{return this.accountNonExpired;}
	@Override
	public boolean isAccountNonLocked() 					{return this.accountNonLocked;}
	@Override
	public boolean isCredentialsNonExpired() 				{return this.credentialsNonExpired;}
	@Override
	public boolean isEnabled() 								{return this.enabled;}

	public String getEmail() 								{return email;}
	public int getZipCode() 								{return zipCode;}
	public List<PetDto> getPets() 							{return pets;}
	public List<PetDto.PetType> getPetPreferences() 		{return petPreferences;}
	public double getRating() 								{return rating;}
	public int getNumberOfRatings() 						{return numberOfRatings;}
	public List<String> getAvailability() 					{return availability;}
	public List<OwnerNotification> getOwnerNotifications()  {return ownerNotifications;}
	public List<SitterNotification> getSitterNotifications(){return sitterNotifications;}

	@Override
	public List<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(List<GrantedAuthority> authorities){
		this.authorities = authorities;
	}

	public void addRating(double newRating) {
		// Do a weighted average of the previous rating and the new rating
        double tempVal = (numberOfRatings * this.rating);
        this.numberOfRatings++;
        this.rating = (tempVal + newRating) / numberOfRatings;
    }
	
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
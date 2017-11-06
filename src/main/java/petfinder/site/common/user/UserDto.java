package petfinder.site.common.user;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetType;

import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto {
	private String name;
	private String email;
	private String username;
	private String password;
	private int zipCode;
	private List<PetDto> pets;
	//Can only hold the strings "dog", "cat", "rodent", "bird"
	private List<PetType> petPreferences;
	private List<String> availability;
	private double rating;
	private int numberOfRatings;

	//Constructors
	//This is a dummy constructor used by elasticsearch DO NOT DELETE
	public UserDto(){
		this.pets = Collections.emptyList();
		this.petPreferences = Collections.emptyList();
		this.availability = Collections.emptyList();
		this.rating = 0;
		this.numberOfRatings = 0;
	}
	//Setters
	public void setName(String name) 		{this.name = name;}
	public void setUsername(String username){this.username = username;}
	public void setPassword(String password){this.password = password;}
	public void setEmail(String email) 		{this.email = email;}
	public void setZipCode(int zipCode)		{this.zipCode = zipCode;}
	public void setPets(List<PetDto> pets) 	{this.pets = pets;}
	public void setPetPreferences(List<String> petPreferencesString){
		ObjectMapper mapper = new ObjectMapper();
		try {
			this.petPreferences = mapper.readValue(petPreferencesString.toString(), mapper.getTypeFactory().constructCollectionType(List.class, PetType.class));
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	public void setRating(double rating) {this.rating = rating;}
	public void setNumberOfRatings(int numberOfRatings) {this.numberOfRatings = numberOfRatings;}
	public void setAvailability(List<String> availability) {this.availability = availability;}


	//Getters
	public String getName() 				{return name;}
	public String getUsername() 			{return username;}
	public String getPassword() 			{return password;}
	public String getEmail() 				{return email;}
	public int getZipCode() 				{return zipCode;}
	public List<PetDto> getPets() 			{return pets;}
	public List<PetType> getPetPreferences() {return petPreferences;}
	public double getRating() 				{return rating;}
	public int getNumberOfRatings() 		{return numberOfRatings;}
	public List<String> getAvailability() 	{return availability;}

	public PetType getPetType(String petName) {
		for(int i = 0; i < this.pets.size(); i++){
			if(this.pets.get(i).getName().equals(petName)){
				return this.pets.get(i).getType();
			}
		}
		return null;
	}

	public void addRating(int newRating) {
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
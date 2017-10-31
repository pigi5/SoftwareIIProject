package petfinder.site.common.user;
import petfinder.site.common.pet.PetDto;

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
	private Integer zipCode;
	private List<PetDto> pets;
	//Can only hold the strings "dog", "cat", "rodent", "bird"
	private List<String> petPreferences;
	private List<String> availability;
	private Double rating;
	private Integer numberOfRatings;

	//Constructors
	//This is a dummy constructor used by elasticsearch DO NOT DELETE
	public UserDto(){
		this.pets = Collections.emptyList();
		this.petPreferences = Collections.emptyList();
		this.availability = Collections.emptyList();
	}
	public UserDto(String name, String email) {
		this.name = name;
		this.email = email;

		this.pets = Collections.emptyList();
		this.petPreferences = Collections.emptyList();

		//rating stuff
		this.rating = -1.0;
		this.numberOfRatings = 0;
		this.pets = Collections.emptyList();

		this.availability = Collections.emptyList();
	}
	public UserDto(String name, String email, List<PetDto> pets){
		this.name = name;
		this.email = email;

		//rating stuff
		this.rating = -1.0;
		this.numberOfRatings = 0;
		this.name = "";
		this.email = "";
		this.username = "";
		this.password = "";
		this.zipCode = 0;
		this.pets = Collections.emptyList();
		this.petPreferences = Collections.emptyList();

		this.availability = Collections.emptyList();
	}
	public UserDto(String name, String email, String username, String password, Integer zipCode){
		this.name = name;
		this.email = email;
		this.username = username;
		this.password = password;
		this.zipCode = zipCode;

		//rating stuff
		this.rating = -1.0;
		this.numberOfRatings = 0;
		this.pets = Collections.emptyList();
		this.petPreferences = Collections.emptyList();

		this.availability = Collections.emptyList();
	}
	public UserDto(UserDto thatUser, List<PetDto> pets){
		this.name = thatUser.name;
		this.email = thatUser.email;
		this.pets = pets;
		this.petPreferences = Collections.emptyList();

		//rating stuff
		this.rating = -1.0;
		this.numberOfRatings = 0;

		this.availability = Collections.emptyList();
	}

	//Setters
	public void setName(String name) { this.name = name; }
	public void setUsername(String username){this.username = username;}
	public void setZipCode(Integer zipCode){this.zipCode = zipCode;}
	public void setPassword(String password){this.password = password;}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPets(List<PetDto> pets) {
		this.pets = pets;
	}

	//Getters
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public List<PetDto> getPets() {
		return pets;
	}
	public String getUsername() { return username; }
	public String getPassword() { return password; }
	public Double getRating() { return rating; }
	public List<String> getPetPreferences() { return petPreferences; }
	public List<String> getAvailability() { return availability; }
	public String getPetType(String name) {
		for(int i = 0; i < this.pets.size(); i++){
			if(this.pets.get(i).getName() == name){
				return this.pets.get(i).getType();
			}
		}
		return null;
	}

	public Double addRating(Integer newRating) {
        if (this.numberOfRatings == 0) {
            this.rating = newRating.doubleValue();
            this.numberOfRatings++;
        } else {
            Double tempVal = (numberOfRatings * this.rating);
            this.numberOfRatings++;
            this.rating = (tempVal + newRating.doubleValue()) / numberOfRatings;
        }
        return this.rating;
    }
	public Integer getZipCode() {
		return zipCode;
	}

	//Easy way to add pets to the database
	public void addPets(List<PetDto> pet){
		if(pets.isEmpty()){
			this.setPets(pet);
		}
		else{
			List<PetDto> newList = Stream.of(this.pets, pet)
									.flatMap(Collection::stream)
									.collect(Collectors.toList());

			this.setPets(newList);
		}
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
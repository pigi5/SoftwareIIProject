package petfinder.site.common.user;
import petfinder.site.common.pet.PetDto;
import java.util.Random;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

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

	//Constructors
	//This is a dummy constructor used by elasticsearch DO NOT DELETE
	public UserDto(){
		this.name = "";
		this.email = "";
		this.username = "";
		this.password = "";
		this.zipCode = 0;
		this.pets = Collections.emptyList();
	}
	public UserDto(String name, String email, String username, String password, Integer zipCode){
		this.name = name;
		this.email = email;
		this.username = username;
		this.password = password;
		this.zipCode = zipCode;
		this.pets = Collections.emptyList();
	}
	public UserDto(UserDto thatUser, List<PetDto> pets){
		this.name = thatUser.name;
		this.email = thatUser.email;
		this.pets = pets;
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
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public Integer getZipCode() {
		return zipCode;
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
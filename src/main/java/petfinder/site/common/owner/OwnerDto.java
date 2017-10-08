package petfinder.site.common.owner;

import java.io.Serializable;
import java.util.List;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class OwnerDto {
	private UserDto user;
	private List<PetDto> pets;

	public OwnerDto(){

	}

	public OwnerDto(UserDto user){
		this.user = user;
	}

	public OwnerDto(UserDto user, List<PetDto> pets) {
		this.user = user;
		this.pets = pets;
	}

	public UserDto getUser() {
		return user;
	}

	public void setUser(UserDto user) {
		this.user = user;
	}

	public List<PetDto> getPets() {
		return pets;
	}

	public void setPets(List<PetDto> pets) {
		this.pets = pets;
	}

	public String getName(){
		return this.user.getName();
	}

	public String getEmail(){
		return this.user.getEmail();
	}

	public Long getId(){
		return this.user.getId();
	}

	public String toString() {
		return "OwnerDto{" +
				"user=" + user +
				'}';
	}
}
package petfinder.site.common.user;
import petfinder.site.common.pet.PetDto;
import java.util.List;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto {
	private Long id;
	private String name;
	private String email;
	private List<PetDto> pets;

	//Constructors
	//This is a dummy constructor used by elasticsearch DO NOT DELETE
	public UserDto(){

	}
	public UserDto(Long id, String name, String email) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	public UserDto(Long id, String name, String email, List<PetDto> pets){
		this.id = id;
		this.name = name;
		this.email = email;
	}

	public UserDto(UserDto thatUser, List<PetDto> pets){
		this.id = thatUser.id;
		this.name = thatUser.name;
		this.email = thatUser.email;
		this.pets = pets;
	}

	//Setters
	public void setId(Long id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPets(List<PetDto> pets) {
		this.pets = pets;
	}

	//Getters
	public Long getId() { return id; }
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public List<PetDto> getPets() {
		return pets;
	}

}
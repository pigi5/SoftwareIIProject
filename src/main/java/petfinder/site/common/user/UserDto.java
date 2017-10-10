package petfinder.site.common.user;
import petfinder.site.common.pet.PetDto;
import java.util.Random;
import java.util.List;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto {
	private Long id;
	private String name;
	private String email;
	private String username;
	private String password;
	private Integer zipCode;
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
	public UserDto(String name, String email, String username, String password, Integer zipCode){
		this.name = name;
		this.email = email;
		this.username = username;
		this.password = password;
		this.zipCode = zipCode;
		this.id = this.generateID();
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

	public Long generateID(){
		Random rand = new Random();
		//NEED BETTER WAY TO GENERATE ID SO NO REPEATS
		Long id = rand.nextLong() % 1000;
		return id;
	}

}
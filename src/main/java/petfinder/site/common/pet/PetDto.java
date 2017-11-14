package petfinder.site.common.pet;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by jlutteringer on 8/23/17.
 */
public class PetDto {
	private String name;
	private PetType type;
	private String description;

	//This is a dummy constructor used by elasticsearch DO NOT DELETE
	public PetDto() {
	}

	public PetDto(String name, PetType type) {
		this.name = name;
		this.type = type;
	}


	public PetDto(String name, PetType type, String description) {
		this.name = name;
		this.type = type;
		this.description = description;
	}

	public String getDescription() {return description;}

	public void setDescription(String Description) {this.description = Description;}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public PetType getType() {
		return type;
	}

	public void setType(String name){
		this.type = PetType.get(name);
	}
	
	public String getNameAndType() {
		return name + " (" + type.toString() + ")";
	}
}
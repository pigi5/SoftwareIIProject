package petfinder.site.common.pet;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class PetDto {
	private String name;
	private String type;
	private String description;

	//This is a dummy constructor used by elasticsearch DO NOT DELETE
	public PetDto() {
	}

	public PetDto(String name, String type) {
		this.name = name;
		this.type = type;
	}


	public PetDto(String name, String type, String description) {
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
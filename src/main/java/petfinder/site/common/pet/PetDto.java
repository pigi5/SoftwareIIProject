package petfinder.site.common.pet;


/**
 * Created by jlutteringer on 8/23/17.
 */
public class PetDto {
	public enum PetType{Dog, Cat, Rodent, Bird, Other};
	
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

	public String getDescription() 					{return description;}
	public String getName() 						{return name;}
	public PetType getType() 						{return type;}

	public void setType(PetType type)				{this.type = type;}
	public void setName(String name) 				{this.name = name;}
	public void setDescription(String Description) 	{this.description = Description;}
	
	public String printNameAndType() {
		return name + " (" + type.toString() + ")";
	}
}
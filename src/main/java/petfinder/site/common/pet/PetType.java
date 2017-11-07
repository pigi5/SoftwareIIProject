package petfinder.site.common.pet;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public enum PetType{
    DOG("Dog"), CAT("Cat"), RODENT("Rodent"), BIRD("Bird");

    private static final Map<String, PetType> lookup = new HashMap<String, PetType>();
    static {
        for (PetType p : PetType.values()) {
            lookup.put(p.getName(), p);
        }
    }
    
    public static PetType get(String name) {
        return lookup.get(name);
    }
    
    public static Set<String> getNames() {
        return lookup.keySet();
    }

    private final String name;

    PetType(String name){
        this.name = name;
    }

    String getName(){
        return this.name;
    }
    
    @Override
    public String toString() {
    	return this.name;
    }
}

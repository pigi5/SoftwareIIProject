package petfinder.site.common.pet;

import java.util.HashMap;
import java.util.Map;

public enum PetType{
    DOG("Dog"), CAT("Cat"), RODENT("Rodent"), BIRD("Bird");

    // after enumerated declarations but before constructor
    private static final Map<String, PetType> lookup = new HashMap<String, PetType>();
    static {
        for (PetType p : PetType.values()) {
            lookup.put(p.name(), p);
        }
    }

    private final String name;

    PetType(String name){
        this.name = name;
    }

    String getName(){
        return this.name;
    }

    // function after constructor
    public static PetType get(String name) {
        return lookup.get(name);
    }

}

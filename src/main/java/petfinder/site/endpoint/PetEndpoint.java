package petfinder.site.endpoint;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@RequestMapping(value = "/api/pets")
public class PetEndpoint {
    static final ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(path = "/types", method = RequestMethod.GET)
    public static ResponseEntity<String> getTypes(){
    	//TODO: return list of pet types here
    	try {
			return ResponseEntity.ok(mapper.writeValueAsString(""/*PetDto.PetType.values()*/));
		} catch (JsonProcessingException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }
}

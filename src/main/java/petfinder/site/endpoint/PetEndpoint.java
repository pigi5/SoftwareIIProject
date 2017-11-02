package petfinder.site.endpoint;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

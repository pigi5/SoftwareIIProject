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

    @Autowired
    //private OwnerService ownerService;
    private UserService userService;
    private UserDao userDao;

    //BONSAI INFORMATION DO NOT DELETE OR CHANGE:
    //BONSAI URL: https://f1cjmlsx:tp7vjypq3wdxiowv@boxwood-8909856.us-east-1.bonsaisearch.net
    static final String ACCESS_KEY = "f1cjmlsx";
    static final String SECRET_KEY = "tp7vjypq3wdxiowv";
    static final String URL = "boxwood-8909856.us-east-1.bonsaisearch.net";

    static final ObjectMapper mapper = new ObjectMapper();

   /* @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public UserDto findOwner(@PathVariable(name = "id") Long id) {
        UserDto user = userService.getUser(id).get();
        return user;
    }*/

    // Returns user information for a given username
    @RequestMapping(path = "/updatepets", method = RequestMethod.POST)
    public static ResponseEntity<String> addPet(@RequestParam(name = "username") String username, @RequestParam(name = "pets") String pets){
    	System.out.println("hello");
    	System.out.println(pets);
    	return EndpointUtil.updateQuery("/users/user/" + username, "{\"pets\":" + pets + "}");
    }

    /*
    // Returns a pet for a given user
    @RequestMapping(path = "/Getpets", method = RequestMethod.GET)
    public static ResponseEntity<String> getPet(@RequestBody UserDto user, @RequestParam(name = "PetName") String petName, @RequestParam(name = "PetType") String petType){
        return EndpointUtil.getOneQuery("/users/user/_search", "_source=petName,petType AND username:" + user.getUsername() + " AND petName:" + petName + " AND petType:" + petType);
        //ResponseEntity<String> Ret = EndpointUtil.getOneQuery("/users/user/_search", "username:" + user.getUsername() + " AND petName:" + petName + " AND petType:" + petType);
    }
    */
}

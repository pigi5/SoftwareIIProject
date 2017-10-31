package petfinder.site.endpoint;


import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.HttpEntity;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;
import org.apache.http.HttpHost;
import javax.servlet.http.HttpSession;

import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserService;
import petfinder.site.common.pet.PetDto;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.ArrayList;
import java.util.Date;
import java.text.DateFormat;


/**
 * Created by jlutteringer on 8/23/17.
 */
//uses dao to pull data. called from frontend

@RestController
@RequestMapping(value = "/api/users")
public class UserEndpoint {
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
    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public static ResponseEntity<String> getUser(@RequestParam(name = "username") String username){
        return EndpointUtil.getOneQuery("/users/user/_search", "username:" + username);
    }

    // Returns user information if username and password are correct
    @RequestMapping(path = "/authuser", method = RequestMethod.GET)
    public static ResponseEntity<String> searchUserPass(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
	    return EndpointUtil.getOneQuery("/users/user/_search", "username:" + username + " AND password:" + password, ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null), ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
	}
    
    // Returns "all" users (1000)
    // Note: to actually get all users, we would need to use pagination via https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html
    @RequestMapping(path = "/allusers", method = RequestMethod.GET)
    public static ResponseEntity<String> getAllUsers(){
	    return EndpointUtil.getMultipleQuery("/users/user/_search", null, 1000);
	}



	@RequestMapping(path = "/match", method = RequestMethod.GET)
    public static ResponseEntity<String> matchOwnerSitter(@RequestParam(name = "startDate") long date, @RequestParam(name = "zipCode") int zipCode, @RequestParam(name = "petTypes") ArrayList<String> petTypes) {

        String preferences = "";
        //create a space delimited string of pet types
        for(int i = 0; i < petTypes.size(); i++){
            preferences.concat(petTypes.get(i));
            preferences.concat(" ");
        }

        //System.out.println(preferences);

        //get date in ms
        Date d = new Date(date * 1000);
        DateFormat df = new SimpleDateFormat("EEEE");
        String dayAvailable = df.format(d);

        //System.out.println(dayAvailable);

        return EndpointUtil.getMultipleQuery("/users/user/_search?", "petPreferences: " + preferences + " AND zipCode: " + zipCode + " AND week: day: " + dayAvailable, 1000);
    }

    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public static ResponseEntity<String> createOwner(@RequestBody UserDto user) {
    	ResponseEntity<String> userCheck = EndpointUtil.getOneQuery("/users/user/_search", "username:" + user.getUsername());
    	if (userCheck.getStatusCode() == HttpStatus.OK) {
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    	} else if (userCheck.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
    		return userCheck;
    	}
    	
    	RestClient restClient = null;
    	
        try {
            System.out.println("\n\nowner recognized as: " + user.toString());

            final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(ACCESS_KEY, SECRET_KEY));


            restClient = RestClient.builder(new HttpHost(URL, 443, "https"))
                    .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
                        @Override
                        public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
                            return httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
                        }
                    })
                    .build();



            String json = mapper.writeValueAsString(user);

            HttpEntity entity = new NStringEntity(json, ContentType.APPLICATION_JSON);

            Response response = restClient.performRequest("POST",
                        "/users/user",
                        Collections.<String, String>emptyMap(),
                        entity
                );
            System.out.println("\n\nreceived response: " + EntityUtils.toString(response.getEntity()));


			/*
			//THIS IS THE LOCAL CONNECTION PROTOCOL DO NOT DELETE
			RestClient restClient = RestClient.builder(
					new HttpHost("localhost", 9200, "http")).build();

			String json = mapper.writeValueAsString(owner);

			HttpEntity entity = new NStringEntity(json, ContentType.APPLICATION_JSON);

			Response response = restClient.performRequest(
					"PUT",
					"/owners/users/" + owner.getUser().getId().toString(),
					Collections.<String, String>emptyMap(),
					entity
			);
			*/

            return ResponseEntity.ok(EntityUtils.toString(response.getEntity()));

        } catch (IOException e){
            e.printStackTrace();

        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } finally {
        	if (restClient != null) {
        		try {
					restClient.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
        	}
        }
    }
}
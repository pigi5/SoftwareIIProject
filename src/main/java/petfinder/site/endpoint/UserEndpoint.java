package petfinder.site.endpoint;


import com.fasterxml.jackson.core.JsonProcessingException;
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
import org.springframework.web.bind.annotation.*;
import org.apache.http.HttpHost;

import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserService;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
    final String ACCESS_KEY = "f1cjmlsx";
    final String SECRET_KEY = "tp7vjypq3wdxiowv";
    final String URL = "boxwood-8909856.us-east-1.bonsaisearch.net";

    ObjectMapper mapper = new ObjectMapper();

   /* @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public UserDto findOwner(@PathVariable(name = "id") Long id) {
        UserDto user = userService.getUser(id).get();
        return user;
    }*/
    
    /*
     * params: query - elasticsearch query string
     * return: defaults to lessResponse of 404 and moreResponse of 500
     */
    private ResponseEntity<String> getOneQuery(String query) {
    	return getOneQuery(query, ResponseEntity.notFound().build(), ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
    }
    
    /*
     * params: query - elasticsearch query string
     *         lessResponse - ResponseEntity to return if 0 hits are found
     *         moreResponse - ResponseEntity to return if >1 hits are found
     * return: reponseEntity containing data for the query
     */
    private ResponseEntity<String> getOneQuery(String query, ResponseEntity<String> lessResponse, ResponseEntity<String> moreResponse) {
    	RestClient restClient = null;
        
        //Set up connection to database
        try{
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

            try{
            	Map<String, String> params =  new HashMap<String, String>();
            	params.put("q", query);
            	Response response = restClient.performRequest("GET", "/users/user/_search", params);

                String responseString = EntityUtils.toString(response.getEntity());
                
                HashMap<String,Object> responseMap = mapper.readValue(responseString, HashMap.class);
                
                // We need one hit, so determine if there are less ore more
                int hits = (int) ((HashMap<String,Object>) responseMap.get("hits")).get("total");
                
                if(hits < 1){
                	return lessResponse;
                } else if (hits > 1) {
                	return moreResponse;
                }
                //If hits is 1 then there was one hit so return response
                HashMap<String,Object> userInfo = (HashMap<String, Object>) ((HashMap<String,Object>) ((List<Object>) ((HashMap<String,Object>) responseMap.get("hits")).get("hits")).get(0)).get("_source");
                return ResponseEntity.ok(mapper.writeValueAsString(userInfo));

            //Error checking
            }catch(Exception e){
                System.out.println(e.toString());
            	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        //Error checking
        } catch (Exception e){
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

    // Returns user information for a given username
    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public ResponseEntity<String> getUser(@RequestParam(name = "username") String username){
        return getOneQuery("username:" + username);
    }


    // Returns user information if username and password are correct
    @RequestMapping(path = "/authuser", method = RequestMethod.GET)
    public ResponseEntity<String> searchUserPass(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
	    return getOneQuery("username:" + username + " AND password:" + password, ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null), ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
	}


    /*
    @RequestMapping(path = "/register", method =RequestMethod.PUT)
    public Response registerUser(@RequestBody UserDto user){
        try{

            //UserDto user = new UserDto(name, email, username, password, zipCode);

            final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(ACCESS_KEY, SECRET_KEY));

            RestClient restClient = RestClient.builder(new HttpHost(URL, 443, "https"))
                    .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
                        @Override
                        public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
                            return httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
                        }
                    })
                    .build();

            String json = mapper.writeValueAsString(user);

            HttpEntity entity = new NStringEntity(json, ContentType.APPLICATION_JSON);

            Response response = null;
            try {
                response = restClient.performRequest("PUT",
                        "/users/user/" + user.getId().toString(),
                        Collections.<String, String>emptyMap(),
                        entity
                );
                System.out.println("\n\nreceived response: " + response);
            }catch(Exception e){
                e.printStackTrace();
            }

            restClient.close();
            return response;

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
    */

    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public ResponseEntity<String> createOwner(@RequestBody UserDto user) {
        HashMap<String,Object> returnInfo = new HashMap<String,Object>();
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
            System.out.println("\n\nreceived response: " + response);


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
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

    @RequestMapping(path = "/auth", method = RequestMethod.GET)
    public Response authenticate(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
        try{
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

            //QueryBuilder qb = QueryBuilders.matchQuery("name", "Steve");

            //SearchRequest searchRequest = new SearchRequest("users");

            //SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
            //sourceBuilder.query(QueryBuilders.termQuery("name", "Steve"));

            //searchRequest.source(sourceBuilder);

            Response response = null;
            try{
                response = restClient.performRequest("GET",
                        "users/user/_search?q=name:" + "Steve"
                );
                System.out.println("\n\nreceived response: " + response);

            }catch(Exception e){
                System.out.println(e.toString());
                return null;
            }

            if(response == null){
                return null;
            }
            return response;

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    //Checks if username and password combination exists in database
    //Returns false if the username password combination DNE and true if it does
    @RequestMapping(path = "/authuser", method = RequestMethod.GET)
    public String SearchUserPass(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
        //public Response SearchUserPass(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){

        HashMap<String,Object> returnInfo = new HashMap<String,Object>();
        
        //Set up connection to database
        try{
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
            //Testing purposes
            //System.out.println(username + " " + password);

            //Create get request to try to find password username combination
            Response response = null;
            try{
            	Map<String, String> params =  new HashMap<String, String>();
            	params.put("q", "username:" + username + " AND password:" + password);
                response = restClient.performRequest("GET", "/users/user/_search", params);

                String responseString = EntityUtils.toString(response.getEntity());
                
                HashMap<String,Object> responseMap = mapper.readValue(responseString, HashMap.class);
                
                int hits = (int) ((HashMap<String,Object>) responseMap.get("hits")).get("total");
                
                //If hits != 1 then there was either no hits or too many hits
                if(hits != 1){
                    returnInfo.put("status", 500);
                    returnInfo.put("content", null);
                } else {
                    //If hits is 1 then there was one hit so return response
                    HashMap<String,Object> userInfo = (HashMap<String, Object>) ((HashMap<String,Object>) ((List<Object>) ((HashMap<String,Object>) responseMap.get("hits")).get("hits")).get(0)).get("_source");
                    returnInfo.put("status", 200);
                    returnInfo.put("content", userInfo);
                }

            //Error checking
            }catch(Exception e){
                System.out.println(e.toString());
                returnInfo.put("status", 500);
                returnInfo.put("content", null);
            }
        //Error checking
        }catch (Exception e){
            e.printStackTrace();
            returnInfo.put("status", 500);
            returnInfo.put("content", null);
        }
        try {
			return mapper.writeValueAsString(returnInfo);
		} catch (JsonProcessingException e) {
			return "{\"status\":500, \"content\":null}";
		}
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
    public String createOwner(@RequestBody UserDto user) throws IOException {
        try {

            System.out.println("\n\nowner recognized as: " + user.toString());

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

            user.generateID();

            String json = mapper.writeValueAsString(user);

            HttpEntity entity = new NStringEntity(json, ContentType.APPLICATION_JSON);

            Response response = null;
            try{
                response = restClient.performRequest("POST",
                        "/users/user",
                        Collections.<String, String>emptyMap(),
                        entity
                );
                System.out.println("\n\nreceived response: " + response);


            }catch(Exception e){
                System.out.println(e.toString());
            }



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

            restClient.close();
            return response.toString();

        } catch (IOException e){
            e.printStackTrace();
            return null;
        }
    }
}
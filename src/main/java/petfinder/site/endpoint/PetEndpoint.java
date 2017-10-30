package petfinder.site.endpoint;

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
    @RequestMapping(path = "/Addpets", method = RequestMethod.POST)
    public static ResponseEntity<String> addPet(@RequestParam(name = "PetName") String petName, @RequestParam(name = "PetType") String petType){
        //public static ResponseEntity<String> addPet(@RequestParam(name = "PetName") String petName, @RequestParam(name = "PetType") String petType,@RequestParam(name = "username") String username){
        RestClient restClient = null;
        try {
            String responseString = null;
            String username = "newuser";
            System.out.println("\n\nowner recognized as: " + username);
            //Setting up connections
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

            HttpEntity entity = new NStringEntity("{\n" +
                            "    \"username\" : \"" + username + "\"\n" +
                            //"    \"type\" : \"nested\"\n" +
                            "    \"Pets\" : " + "[" + "\n" +
                            "{\n    \"PetName\" : \"" + petName + "\",\n" +
                            "    \"PetType\" : \"" + petType + "\"\n" +
                            "}\n  ]\n  }", ContentType.APPLICATION_JSON);

            Response response = restClient.performRequest("POST", "/users/user",
                    Collections.<String, String>emptyMap(),
                    entity
            );

            System.out.println("\n\nreceived response: " + EntityUtils.toString(response.getEntity()));
            System.out.println("\n\nreceived status: " + ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));

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
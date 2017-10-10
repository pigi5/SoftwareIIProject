package petfinder.site.endpoint;


import java.util.Optional;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpEntity;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.apache.http.nio.entity.NStringEntity;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import static org.elasticsearch.common.xcontent.XContentFactory.*;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.index.query.QueryBuilders.*;
import org.elasticsearch.search.builder.*;
import org.apache.http.HttpHost;

import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserService;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.Collections;
import java.net.InetAddress;


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

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public UserDto findOwner(@PathVariable(name = "id") Long id) {
        UserDto user = userService.getUser(id).get();
        return user;
    }

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

    @RequestMapping(path = "/register", method =RequestMethod.PUT)
    public Response registerUser(@RequestParam(value = "email") String email, @RequestParam(value = "username") String username, @RequestParam(value = "password") String password, @RequestParam(value = "name") String name, @RequestParam(value = "zip") Integer zipCode){
        try{

            UserDto user = new UserDto(name, email, username, password, zipCode);

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

    @RequestMapping(path = "/add", method = RequestMethod.PUT)
    public Response createOwner(@RequestBody UserDto user) throws IOException {
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

            String json = mapper.writeValueAsString(user);

            HttpEntity entity = new NStringEntity(json, ContentType.APPLICATION_JSON);

            Response response = null;
            try{
                response = restClient.performRequest("PUT",
                        "/users/user/" + user.getId().toString(),
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
            return response;

        } catch (IOException e){
            e.printStackTrace();
            return null;
        }
    }
}
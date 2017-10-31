package petfinder.site.endpoint;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto;

public class EndpointUtil {

    //BONSAI INFORMATION DO NOT DELETE OR CHANGE:
    //BONSAI URL: https://f1cjmlsx:tp7vjypq3wdxiowv@boxwood-8909856.us-east-1.bonsaisearch.net
    final static String ACCESS_KEY = "f1cjmlsx";
    final static String SECRET_KEY = "tp7vjypq3wdxiowv";
    final static String URL = "boxwood-8909856.us-east-1.bonsaisearch.net";

    final static ObjectMapper mapper = new ObjectMapper();
    
	/*
     * description: performs a "get multiple" type query on the elastic search database
     * params: esEndpoint - elasticsearch endpoint (EX: /users/user)
     *         query - elasticsearch query string
     * return: reponseEntity containing data for the query
     */
    static ResponseEntity<String> getMultipleQuery(String esEndpoint, String query, int amount) {
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


            
        	Map<String, String> params =  new HashMap<String, String>();
        	if (query != null) {
        		params.put("q", query);
        	}

            params.put("size", Integer.toString(amount));

        	Response response = restClient.performRequest("GET", esEndpoint + "/_search", params);
        	System.out.println(esEndpoint+params);

            String responseString = EntityUtils.toString(response.getEntity());
            
            HashMap<String,Object> responseMap = mapper.readValue(responseString, HashMap.class);
            
            // We need one hit, so determine if there are less ore more
            int hits = (int) ((HashMap<String,Object>) responseMap.get("hits")).get("total");
            
            if(hits < 1){
            	return ResponseEntity.notFound().build();
            }
            // If hits is >1 then there was one hit so return response
            // Take out _source from each hit and construct new list
            List<HashMap<String, Object>> retObjs = new LinkedList<HashMap<String, Object>>();
            for (HashMap<String,Object> obj : ((List<HashMap<String, Object>>) ((HashMap<String,Object>) responseMap.get("hits")).get("hits"))) {
            	retObjs.add((HashMap<String, Object>) obj.get("_source"));
            }
            return ResponseEntity.ok(mapper.writeValueAsString(retObjs));
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
    
    /*
     * params: query - elasticsearch query string
     * return: defaults to lessResponse of 404 and moreResponse of 500
     */
    static ResponseEntity<String> getOneQuery(String esEndpoint, String query) {
    	return getOneQuery(esEndpoint, query, ResponseEntity.notFound().build(), ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
    }
    
    /*
     * description: performs a "get one" type query on the elastic search database and allows
     * 		 for specification of what type of responses to return if only one item is not found
     * params: esEndpoint - elasticsearch endpoint (EX: /users/user)
     *         query - elasticsearch query string
     *         lessResponse - ResponseEntity to return if 0 hits are found
     *         moreResponse - ResponseEntity to return if >1 hits are found
     * return: reponseEntity containing data for the query
     */
    static ResponseEntity<String> getOneQuery(String esEndpoint, String query, ResponseEntity<String> lessResponse, ResponseEntity<String> moreResponse) {
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

            
        	Map<String, String> params =  new HashMap<String, String>();
        	if (query != null) {
        		params.put("q", query);
        	}
        	Response response = restClient.performRequest("GET", esEndpoint + "/_search", params);

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

    static ResponseEntity<String> updateQuery(String esEndpoint, String docJS) {
        RestClient restClient = null;

        //Set up connection to database
        try {
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

            HttpEntity entity = new NStringEntity("{\"doc\":" + docJS + "}", ContentType.APPLICATION_JSON);

            Response response = restClient.performRequest("POST", esEndpoint + "/_update", Collections.<String, String>emptyMap(), entity);

            System.out.println("\n\nreceived response: " + EntityUtils.toString(response.getEntity()));

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

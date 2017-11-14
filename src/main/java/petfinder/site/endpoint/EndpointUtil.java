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
import org.elasticsearch.client.ResponseException;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.ObjectMapper;

public class EndpointUtil {

    //BONSAI INFORMATION DO NOT DELETE OR CHANGE:
    //BONSAI URL: https://f1cjmlsx:tp7vjypq3wdxiowv@boxwood-8909856.us-east-1.bonsaisearch.net
    final static String ACCESS_KEY = "f1cjmlsx";
    final static String SECRET_KEY = "tp7vjypq3wdxiowv";
    final static String URL = "boxwood-8909856.us-east-1.bonsaisearch.net";

    final static ObjectMapper mapper = new ObjectMapper();
    
    private static RestClient getRestClient() {
        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(ACCESS_KEY, SECRET_KEY));

        return RestClient.builder(new HttpHost(URL, 443, "https"))
                .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
                    @Override
                    public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
                        return httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
                    }
                })
                .build();
    }

    /*
     * description: performs a "get" type query on the elastic search database
     * params: esEndpoint - elasticsearch endpoint (EX: /users/user/bob)
     * return: reponseEntity containing data for the query
     */
    static ResponseEntity<String> getQuery(String esEndpoint, boolean returnSource) {
    	RestClient restClient = getRestClient();
        
        //Set up connection to database
        try{
        	Response response = restClient.performRequest("GET", esEndpoint);

            String responseString = EntityUtils.toString(response.getEntity());

            HashMap<String,Object> responseMap = mapper.readValue(responseString, HashMap.class);

            if (!returnSource) {
                return ResponseEntity.ok(null);
            }

        	return ResponseEntity.ok(mapper.writeValueAsString(responseMap.get("_source")));
        } catch (ResponseException re) {
        	return ResponseEntity.status(HttpStatus.valueOf(re.getResponse().getStatusLine().getStatusCode())).body(null);
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
     * description: performs a "search multiple" type query on the elastic search database
     * params: esEndpoint - elasticsearch endpoint (EX: /users/user)
     *         query - elasticsearch query string
     * return: reponseEntity containing data for the query
     */
    static ResponseEntity<String> searchMultipleQuery(String esEndpoint, String query, int amount) {
    	RestClient restClient = getRestClient();
        
        //Set up connection to database
        try{
        	Map<String, String> params =  new HashMap<String, String>();
        	if (query != null) {
        		params.put("q", query);
        	}


            params.put("size", Integer.toString(amount));

        	Response response = restClient.performRequest("GET", esEndpoint + "/_search", params);

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
        } catch (ResponseException re) {
        	return ResponseEntity.status(HttpStatus.valueOf(re.getResponse().getStatusLine().getStatusCode())).body(null);
        } catch (IOException e) {
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
    static ResponseEntity<String> searchOneQuery(String esEndpoint, String query) {
    	return searchOneQuery(esEndpoint, query, ResponseEntity.notFound().build(), ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
    }

    /*
     * description: performs a "search one" type query on the elastic search database and allows
     * 		 for specification of what type of responses to return if only one item is not found
     * params: esEndpoint - elasticsearch endpoint (EX: /users/user)
     *         query - elasticsearch query string
     *         lessResponse - ResponseEntity to return if 0 hits are found
     *         moreResponse - ResponseEntity to return if >1 hits are found
     * return: reponseEntity containing data for the query
     */
    static ResponseEntity<String> searchOneQuery(String esEndpoint, String query, ResponseEntity<String> lessResponse, ResponseEntity<String> moreResponse) {
    	RestClient restClient = getRestClient();
        
        //Set up connection to database
        try{
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
        } catch (ResponseException re) {
        	return ResponseEntity.status(HttpStatus.valueOf(re.getResponse().getStatusLine().getStatusCode())).body(null);
        } catch (IOException e) {
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
    	RestClient restClient = getRestClient();

        try {
        	String jsonString = "{\"doc\":" + docJS + "}";
        	HttpEntity entity = new NStringEntity(jsonString, ContentType.APPLICATION_JSON);
        	
            Response response = restClient.performRequest("POST", esEndpoint + "/_update", Collections.emptyMap(), entity);
            
            return ResponseEntity.ok(EntityUtils.toString(response.getEntity()));
        } catch (ResponseException re) {
        	return ResponseEntity.status(HttpStatus.valueOf(re.getResponse().getStatusLine().getStatusCode())).body(null);
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

    static ResponseEntity<String> indexQueryPost(String esEndpoint, String docJS) {
        RestClient restClient = getRestClient();

        try {
            Map<String, String> params = new HashMap<String, String>();
            //params.put("op_type", "create");

            HttpEntity entity = new NStringEntity(docJS, ContentType.APPLICATION_JSON);

            Response response = restClient.performRequest("POST", esEndpoint, params, entity);

            return ResponseEntity.ok(EntityUtils.toString(response.getEntity()));
        } catch (ResponseException re) {
            return ResponseEntity.status(HttpStatus.valueOf(re.getResponse().getStatusLine().getStatusCode())).body(null);
        } catch (IOException e) {
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

    static ResponseEntity<String> indexQuery(String esEndpoint, String docJS) {
    	RestClient restClient = getRestClient();

        try {
        	Map<String, String> params = new HashMap<String, String>();
        	params.put("op_type", "create");
        	
        	HttpEntity entity = new NStringEntity(docJS, ContentType.APPLICATION_JSON);
        	
            Response response = restClient.performRequest("PUT", esEndpoint, params, entity);
            
            return ResponseEntity.ok(EntityUtils.toString(response.getEntity()));
        } catch (ResponseException re) {
        	return ResponseEntity.status(HttpStatus.valueOf(re.getResponse().getStatusLine().getStatusCode())).body(null);
        } catch (IOException e) {
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

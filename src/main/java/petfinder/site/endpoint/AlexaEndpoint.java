package petfinder.site.endpoint;

import java.io.IOException;
import java.util.Collections;

import java.util.Scanner;


import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;

import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;

import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.boot.json.JsonParser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.user.UserDto;

@RestController
@RequestMapping(value = "/api/alexa")
public class AlexaEndpoint {
	//BONSAI INFORMATION DO NOT DELETE OR CHANGE:
	//BONSAI URL: https://f1cjmlsx:tp7vjypq3wdxiowv@boxwood-8909856.us-east-1.bonsaisearch.net
	final String ACCESS_KEY = "f1cjmlsx";
	final String SECRET_KEY = "tp7vjypq3wdxiowv";
	final String URL = "boxwood-8909856.us-east-1.bonsaisearch.net";
	
	ObjectMapper mapper = new ObjectMapper();
	
	@RequestMapping(path = "/getSitters", method = RequestMethod.GET)
	public String getSitters() throws IOException {
		try {
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
			
			Response response = null;
			try{
				response = restClient.performRequest("GET",
						"/users/user/_search?q=available:yes",
						Collections.<String, String>emptyMap()
				);

			}catch(Exception e){
				System.out.println(e.toString());
			}

			restClient.close();
			try (Scanner s = new Scanner(response.getEntity().getContent()).useDelimiter("\\A")) {
				return s.hasNext() ? s.next() : "";		
			}

		} catch (IOException e){
			e.printStackTrace();
			return null;
		}
	}
}
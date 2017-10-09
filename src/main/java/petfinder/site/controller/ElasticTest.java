/*
package petfinder.site.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.rest.RestStatus;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.owner.OwnerDto;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
*/
/*
@RestController
@RequestMapping("/elastic")
public class ElasticTest {

    ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/owners/{id}")
    public GetResponse getOwner(@PathVariable Integer id) throws IOException {

        System.out.println("\n\nrequesting ID: " + id.toString());


        TransportClient client = new PreBuiltTransportClient(Settings.EMPTY)
                .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9200));

        //GetResponse response = client.prepareGet("users", "owners", id.toString()).get();

        System.out.println("\n\nreceived response: " + response);

        client.close();

        return response;
    }
}
*/
/*
package petfinder.site.test.unit;

import static org.junit.Assert.assertEquals;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;

import org.elasticsearch.index.mapper.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import petfinder.site.common.user.UserDto;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class unitTests {
	 @Autowired
	 private MockMvc mockMvc;
	 
	 
	 @Test
	 public void testAlexaEndpoint() throws Exception {
		 this.mockMvc.perform(get("/api/alexa/getSitters")).andDo(print()).andExpect(status().isOk());
	  }
    
}
*/
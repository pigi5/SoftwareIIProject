package petfinder.site.test.integration;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.Charset;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import petfinder.site.WebSecurityConfiguration;
import petfinder.site.common.user.UserDto;
import petfinder.site.endpoint.EndpointUtil;
import petfinder.site.endpoint.UserEndpoint;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserEndpointTest {

	@Autowired
    private WebApplicationContext wac;
	private ObjectMapper mapper = new ObjectMapper();
    private MockMvc mockMvc;
    private UserDto testUser;
    
    @Before
    public void setup() throws JsonProcessingException {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        testUser = new UserDto();
        testUser.setName("Jack");
        testUser.setUsername("testUserUser");
        testUser.setEmail("testUser@hotmail.com");
        testUser.setPassword("password");
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        try {
			mockMvc.perform(get("/loginApi/login")
			        .param("username", testUser.getUsername())
			        .param("password", testUser.getPassword())
			);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    @Test
    public void testCreateOwner() throws Exception {
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(testUser);
        mockMvc.perform(put("/api/users/add").contentType(MediaType.APPLICATION_JSON)
            .content(requestJson))
            .andExpect(status().isOk());
    }
    @Test
    public void testGetUser() throws Exception {
		ResponseEntity<String> getUserResponse = UserEndpoint.getUser(testUser.getUsername());
		UserDto user = mapper.readValue(getUserResponse.getBody(), UserDto.class);
		assertEquals(testUser.getUsername(),user.getUsername());
    }
    @Test
    public void testCurrentUser() throws Exception {
		assertEquals(testUser.getUsername(),UserEndpoint.getCurrentUsername());
    }

    @Test
    public void testUserExists() throws Exception {
	    mockMvc.perform(get("/api/users/exists")
	            .param("username", testUser.getUsername())              
	    ).andDo(print())
	     .andExpect(status().isOk());
    }

    @Test
    public void testRefresh() throws Exception {
	    mockMvc.perform(get("/api/users/exists")
	            .param("username", testUser.getUsername())              
	    ).andDo(print())
	     .andExpect(status().isOk());

    }
    /*@Test
    public void testMatchOwnerSitter() throws Exception {
    	Date d = new Date();
        DateFormat df = new SimpleDateFormat("EEEE");
        String date = df.format(d);
    	String zipCode = "76706";
    	String petTypes = "dog";
	    mockMvc.perform(get("/api/users/match")
	            .param("startDate", date)
	            .param("zipCode", zipCode)
	            .param("petTypes[]",petTypes)
	    ).andDo(print())
	     .andExpect(status().isOk());
    }
    */


	public static void removeUser(String endpoint) {
		EndpointUtil.remove(endpoint);
	}

	@AfterClass
	public static void clean() {
		removeUser("/users/user/testUserUser");
	}
	
}

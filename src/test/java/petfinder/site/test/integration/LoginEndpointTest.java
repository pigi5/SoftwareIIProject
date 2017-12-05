package petfinder.site.test.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

import petfinder.site.common.user.UserDto;
import petfinder.site.endpoint.EndpointUtil;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class LoginEndpointTest {

    @Autowired
    private MockMvc mockMvc;

	private ObjectMapper mapper = new ObjectMapper();
    private UserDto testUser;
    
    @Before
    public void setup() throws JsonProcessingException {
        testUser = new UserDto();
        testUser.setName("Jack");
        testUser.setUsername("loginTestUser");
        testUser.setEmail("testUser@hotmail.com");
        testUser.setPassword("password");
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(testUser);
        try {
			mockMvc.perform(put("/api/users/add").contentType(MediaType.APPLICATION_JSON)
			    .content(requestJson));
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
    
    @Test
    public void testLoginSuccess() throws Exception {
	    mockMvc.perform(get("/loginApi/login")
	            .param("username", testUser.getUsername())
	            .param("password", testUser.getPassword())
	    )
	     .andExpect(status().isOk());
    }
    
    @Test
    public void testLoginWrongUsername() throws Exception {
	    mockMvc.perform(get("/loginApi/login")
	            .param("username", testUser.getUsername()+"-")
	            .param("password", testUser.getPassword())
	    ).andExpect(status().is4xxClientError());
    }

    @Test
    public void testLoginWrongPassword() throws Exception {
	    mockMvc.perform(get("/loginApi/login")
	            .param("username", testUser.getUsername())
	            .param("password", testUser.getPassword()+".")
	    ).andExpect(status().is4xxClientError());
    }

	public static void removeUser(String endpoint) {
		EndpointUtil.remove(endpoint);
	}

	@AfterClass
	public static void clean() {
		removeUser("/users/user/loginTestUser");
	}
}
package petfinder.site.endpoint;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import petfinder.site.WebSecurityConfiguration;
import petfinder.site.common.user.UserDto;

/**
 * Created by jlutteringer on 10/10/17.
 */
@RestController
@RequestMapping(value = "/loginApi/login")
public class LoginEndpoint {

    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder = WebSecurityConfiguration.passwordEncoder();

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<String> login(@RequestParam (name = "username") String username, @RequestParam (name = "password")String password) {
        ResponseEntity<String> result = UserEndpoint.getUser(username);
        if(result.getStatusCode() == HttpStatus.OK) {
        	// Get user from database with given username, reject with 500 if there's an error reading
        	UserDto user;
            try {
				user = mapper.readValue(result.getBody(), UserDto.class);
			} catch (IOException e) {
				e.printStackTrace();
	        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}

        	// Test encoded password against raw password, reject with 401 if don't match
            if (!passwordEncoder.matches(password, user.getPassword())) {
            	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
            Authentication auth = authenticationManager.authenticate(token);

            SecurityContextImpl securityContext = new SecurityContextImpl();
            securityContext.setAuthentication(auth);
            SecurityContextHolder.setContext(securityContext);
        } else {
        	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return result;
    }
}
package petfinder.site.endpoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.user.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import javax.xml.ws.Response;
import java.util.List;

/**
 * Created by jlutteringer on 10/10/17.
 */
@RestController
@RequestMapping(value = "/loginApi/login")
public class LoginEndpoint {

    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private AuthenticationManager authenticationManager;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<String> login(@RequestParam (name = "username") String username, @RequestParam (name = "password")String password) {
        ResponseEntity<String> result = UserEndpoint.searchUserPass(username, password);
        //if(result.getStatusCode() == HttpStatus.OK) {
	        //try {
	            //UserDto user = mapper.readValue(result.getBody().toString(), UserDto.class);


        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
        Authentication auth = authenticationManager.authenticate(token);

        SecurityContextImpl securityContext = new SecurityContextImpl();
        securityContext.setAuthentication(auth);
        SecurityContextHolder.setContext(securityContext);
	
	        //}catch(Exception e){
	            //e.printStackTrace();
	            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        //}
        //}
		System.out.println("HERE");
		System.out.println(result.getBody().toString());
        return result;
    }
}
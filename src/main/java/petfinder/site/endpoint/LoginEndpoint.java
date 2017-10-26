package petfinder.site.endpoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
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
@RequestMapping(value = "/api/login")
public class LoginEndpoint {

    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private AuthenticationManager authenticationManager;



    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<String> login(@RequestParam (name = "username") String username, @RequestParam (name = "password")String password) {

        ResponseEntity<String> result = UserEndpoint.searchUserPass(username, password);

        try {

            UserDto user = mapper.readValue(result.getBody().toString(), UserDto.class);


            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            Authentication auth = authenticationManager.authenticate(token);

            SecurityContextImpl securityContext = new SecurityContextImpl();
            securityContext.setAuthentication(auth);
            SecurityContextHolder.setContext(securityContext);

        }catch(Exception e){
            e.printStackTrace();
            //TODO- failed authentication handling
        }

        return result;
    }
}
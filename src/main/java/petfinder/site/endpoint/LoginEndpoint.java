package petfinder.site.endpoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import petfinder.site.WebSecurityConfiguration;
import sun.security.util.Password;

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
        ResponseEntity<String> result = UserEndpoint.searchUserPass(username, passwordEncoder.encode(password));
        System.out.println(result);
        if(result.getStatusCode() == HttpStatus.OK) {
            //try {
            //UserDto user = mapper.readValue(result.getBody().toString(), UserDto.class);
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
            Authentication auth = authenticationManager.authenticate(token);

            SecurityContextImpl securityContext = new SecurityContextImpl();
            securityContext.setAuthentication(auth);
            SecurityContextHolder.setContext(securityContext);
        }
        return result;
    }
}
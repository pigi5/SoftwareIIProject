package petfinder.site.endpoint;

import org.springframework.web.bind.annotation.*;
import petfinder.site.common.user.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

/**
 * Created by jlutteringer on 10/10/17.
 */
@RestController
@RequestMapping(value = "/api/login")
public class LoginEndpoint {

    @Autowired
    private AuthenticationManager authenticationManager;


    @RequestMapping(method = RequestMethod.POST)
    public String login(@RequestParam (name = "username") String username, @RequestParam (name = "password")String password) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
        Authentication auth = authenticationManager.authenticate(token);

        SecurityContextImpl securityContext = new SecurityContextImpl();
        securityContext.setAuthentication(auth);
        SecurityContextHolder.setContext(securityContext);
        return "Success.";
    }

    /*
    @RequestMapping(method = RequestMethod.POST)
    public String login(@RequestBody UserDto loginDto) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        Authentication auth = authenticationManager.authenticate(token);



        SecurityContextImpl securityContext = new SecurityContextImpl();
        securityContext.setAuthentication(auth);
        SecurityContextHolder.setContext(securityContext);
        return "Success.";
    }
    */
}
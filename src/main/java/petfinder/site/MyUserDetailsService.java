package petfinder.site;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.*;
import petfinder.site.endpoint.UserEndpoint;
import com.fasterxml.jackson.databind.ObjectMapper;
import petfinder.site.common.user.UserDto;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.LinkedList;

@Service("userDetailsService")
public class MyUserDetailsService implements UserDetailsService{
    ObjectMapper mapper = new ObjectMapper();
    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException{
        ResponseEntity<String> response  = UserEndpoint.getUser(username);
        try {
            UserDto user = mapper.readValue(response.getBody().toString(), UserDto.class);
            List<GrantedAuthority> authorities = new LinkedList<GrantedAuthority>();
            authorities.add(new SimpleGrantedAuthority("USER"));
            return buildUserForAuthentication(user, authorities);

        }catch(IOException e){
            e.printStackTrace();
            return null;
        }catch(UsernameNotFoundException e){
            e.printStackTrace();
            return null;
        }
    }
    private User buildUserForAuthentication(UserDto user, List<GrantedAuthority> authorities) {
        return new User(user.getUsername(), user.getPassword(),
                user.isEnabled(), true, true, true, authorities);
    }
}

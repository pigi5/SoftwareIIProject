package petfinder.site;

import petfinder.site.common.user.UserDto;
import java.util.ArrayList;
import petfinder.site.endpoint.UserEndpoint;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by jlutteringer on 8/22/17.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

	ObjectMapper mapper = new ObjectMapper();
	UserEndpoint userEndpoint = new UserEndpoint();

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.csrf().disable()
				//.authorizeRequests()
					//why have these specific restrictions when we just have
					//anyrequest().authenticated() which makes all requests
					//require authentication
					//.antMatchers("/**").permitAll()
					/*
					.antMatchers("/api/login").permitAll()
					.antMatchers("/statics/**").permitAll()
					*/
				//.anyRequest().authenticated()
					//.and()
				.formLogin()
					.loginPage("/")
					.permitAll()
					.and()
				.logout()
					.permitAll();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		//how to pull the stored passwords from db
		//LDAP? seems really complex, probably an easier way
		//JDBC? jdbc seems pretty specific to sql
		//Add this into a for loop after retrieving a list of user names/passwords?

		ArrayList<UserDto> users = mapper.readValue(userEndpoint.getAllUsers().toString(), mapper.getTypeFactory().constructCollectionType(ArrayList.class, UserDto.class));

		for(int i = 0; i < users.size(); i++){
			auth.inMemoryAuthentication()
					.withUser("username").password("password").roles("USER");
					/*
					.withUser(users.get(i).getUsername()).password(users.get(i).getPassword()).roles("USER");
					*/
		}

		/*
		auth.inMemoryAuthentication()
				.withUser("user").password("password").roles("USER")
				.and()
				.withUser("admin").password("admin").roles("USER", "ADMIN");
		*/
	}
}
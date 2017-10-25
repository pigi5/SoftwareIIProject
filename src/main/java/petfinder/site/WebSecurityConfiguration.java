package petfinder.site;
import petfinder.site.endpoint.EndpointUtil;
import petfinder.site.common.user.UserDto;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import petfinder.site.endpoint.UserEndpoint;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import javax.xml.ws.Endpoint;

/**
 * Created by jlutteringer on 8/22/17.
 */

/*
@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
*/
		/*
		http
				.authorizeRequests()
					.antMatchers("/").permitAll()
				.antMatchers("/statics/**").permitAll()
			//	.anyRequest().authenticated()
					.and()
				.formLogin()
					.loginPage("/login")
					.permitAll()
					.and()
				.logout()
					.permitAll();
					*/
/*
		http
				.csrf().disable();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
				.withUser("user").password("password").roles("USER")
				.and()
				.withUser("admin").password("admin").roles("USER", "ADMIN");
	}
}
*/



@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

	ObjectMapper mapper = new ObjectMapper();

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.csrf().disable();
				//.authorizeRequests()
					//why have these specific restrictions when we just have
					//anyrequest().authenticated() which makes all requests
					//require authentication
					//.antMatchers("/**").permitAll()

					//.antMatchers("/api/login").permitAll()
					//.antMatchers("/statics/**").permitAll()

				//.anyRequest().authenticated()
					//.and()
				//.formLogin()
				//	.loginPage("/")
				//	.permitAll()
				//	.and()
				//.logout()
				//	.permitAll();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

		EndpointUtil endpointUtil = new EndpointUtil();

		//BONSAI INFORMATION DO NOT DELETE OR CHANGE:
		//BONSAI URL: https://f1cjmlsx:tp7vjypq3wdxiowv@boxwood-8909856.us-east-1.bonsaisearch.net
		final static String ACCESS_KEY = "f1cjmlsx";
		final static String SECRET_KEY = "tp7vjypq3wdxiowv";
		final static String URL = "boxwood-8909856.us-east-1.bonsaisearch.net";

		//how to pull the stored passwords from db
		//LDAP? seems really complex, probably an easier way
		//JDBC? jdbc seems pretty specific to sql
		//Add this into a for loop after retrieving a list of user names/passwords?

		List<HashMap<String, Object>> tempUsers = new LinkedList<HashMap<String, Object>>();

		tempUsers = mapper.readValue(endpointUtil.getMultipleQuery("/users/user/_search", null).toString(), mapper.getTypeFactory().constructCollectionType(List.class, UserDto.class));


		for(int i = 0; i < 10/*users.size()*/; i++){
			auth.inMemoryAuthentication()
					//.withUser(users.get(i).getUsername()).password(users.get(i).getPassword()).roles("USER");
					.withUser("username").password("password").roles("USER");
		}


		/*
		auth.inMemoryAuthentication()
				.withUser("user").password("password").roles("USER")
				.and()
				.withUser("admin").password("admin").roles("USER", "ADMIN");
		*/
	}
}

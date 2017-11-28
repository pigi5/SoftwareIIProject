package petfinder.site;

import java.lang.String;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * Created by jlutteringer on 8/22/17.
 */



@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	@Qualifier("userDetailsService")
	UserDetailsService userDetailsService;

	//BONSAI INFORMATION DO NOT DELETE OR CHANGE:
	//BONSAI URL: https://f1cjmlsx:tp7vjypq3wdxiowv@boxwood-8909856.us-east-1.bonsaisearch.net
	final static String ACCESS_KEY = "f1cjmlsx";
	final static String SECRET_KEY = "tp7vjypq3wdxiowv";
	final static String URL = "boxwood-8909856.us-east-1.bonsaisearch.net";

	ObjectMapper mapper = new ObjectMapper();



	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.csrf().disable()
				.authorizeRequests()
					.antMatchers("/statics/**").permitAll()
					.antMatchers("/loginApi/**").permitAll()
					.antMatchers("/api/users/add").permitAll()
					.antMatchers("/api/users/exists").permitAll()
					.antMatchers("/api/pets/types").permitAll()
					.antMatchers("/api/users/refresh").permitAll()
				.anyRequest().authenticated()
					.and()
				.formLogin()
					.loginPage("/")
					.permitAll()
					.and()
				.logout()
					.permitAll();
	}


	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

}

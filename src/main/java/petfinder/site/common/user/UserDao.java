package petfinder.site.common.user;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.google.common.collect.ImmutableMap;

/**
 * Created by jlutteringer on 8/23/17.
 */
//Queries
/*
@Repository
public class UserDao {
	private final Map<String, UserDto> users =
			ImmutableMap.<String, UserDto> builder()
					.put("john1", new UserDto("John", "email@email.com", "john1", "password1", 12345))
					.put("bob1", new UserDto("Bob", "email@email.com", "bob1", "password1", 12345))
					.put("sarah1", new UserDto("Sarah", "email@email.com", "sarah1", "password1", 12345))
					.put("rachel1", new UserDto("Rachel", "email@email.com", "rachel1", "password1", 12345))
					.put("steve1", new UserDto("Steve", "email@email.com", "steve1", "password1", 12345))
					.build();

	public Optional<UserDto> findUser(String username) {
		return Optional.ofNullable(users.get(username));
	}
}
*/
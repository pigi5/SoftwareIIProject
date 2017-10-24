package petfinder.site.common.user;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.google.common.collect.ImmutableMap;

/**
 * Created by jlutteringer on 8/23/17.
 */
//Queries

@Repository
public class UserDao {
	private final Map<Long, UserDto> users =
			ImmutableMap.<Long, UserDto> builder()
					.put(1L, new UserDto("John", "email@email.com", "john1", "password1", 12345))
					.put(2L, new UserDto("Bob", "email@email.com", "bob1", "password1", 12345))
					.put(3L, new UserDto("Sarah", "email@email.com", "sarah1", "password1", 12345))
					.put(4L, new UserDto("Rachel", "email@email.com", "rachel1", "password1", 12345))
					.put(5L, new UserDto("Steve", "email@email.com", "steve1", "password1", 12345))
					.build();

	public Optional<UserDto> findUser(Long id) {
		return Optional.ofNullable(users.get(id));
	}
}
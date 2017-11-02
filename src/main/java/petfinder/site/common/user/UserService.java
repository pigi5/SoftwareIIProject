package petfinder.site.common.user;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.common.collect.ImmutableMultimap;
import com.google.common.collect.Multimap;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class UserService {

	@Autowired
	private PetService petService;

	/*
	private final Multimap<String, Long> userMapping =
			ImmutableMultimap.<String, Long> builder()
					.put("sarah1", 1L)
					.put("bob1", 2L)
					.put("john1", 3L)
					.put("bob1", 4L)
					.put("john1", 5L)
					.build();

	
	public Optional<UserDto> getUser(String username) {
		Optional<UserDto> user = userDao.findUser(username);
		if(!user.isPresent()){
			return Optional.empty();
		}

		List<PetDto> pets = userMapping.get(user.get().getUsername()).stream().map(petId -> petService.findPet(petId))
				.flatMap(o -> o.isPresent() ? Stream.of(o.get()) : Stream.empty())
				.collect(Collectors.toList());

		return Optional.of(new UserDto(user.get(), pets));
	}

	*/
	/*
	public Optional<UserDto> getUser(Long id) {
		Optional<UserDto> user = userDao.findUser(id);
		if(!user.isPresent()){
			return Optional.empty();
		}

		List<PetDto> pets = userMapping.get(user.get().getId()).stream().map(petId -> petService.findPet(petId))
				.flatMap(o -> o.isPresent() ? Stream.of(o.get()) : Stream.empty())
				.collect(Collectors.toList());

		user.get().setPets(pets);

		return user;
	}
	*/

	/*
	public Optional<UserDto> getUser(Long id){
		Optional<UserDto> user = userService.findUser(id);
		if(!user.isPresent()){
			return Optional.empty();
		}

		List<PetDto> pets = userMapping.get(user.get().getId()).stream()
				.map(petId -> petService.findPet(petId))
				.flatMap(o -> o.isPresent() ? Stream.of(o.get()) : Stream.empty())
				.collect(Collectors.toList());

		return Optional.of(new UserDto(user.get(), pets));

	}
	*/

	/*
	public Optional<UserDto> findUser(Long id) {
		Optional<UserDto> user = userService.findUser(id);
		if(!user.isPresent()) {
			return Optional.empty();
		}

		List<PetDto> pets = userMapping.get(user.get().getId()).stream()
				.map(petId -> petService.findPet(petId))
				.flatMap(o -> o.isPresent() ? Stream.of(o.get()) : Stream.empty())
				.collect(Collectors.toList());

		return Optional.of(new UserDto(user.get(), pets));
	}
	*/
}
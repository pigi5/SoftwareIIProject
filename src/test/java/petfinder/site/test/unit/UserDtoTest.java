package petfinder.site.test.unit;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;



@RunWith(SpringJUnit4ClassRunner.class)
public class UserDtoTest {
	private UserDto testUserDto;
	private static final double DELTA = 1e-15;
	
	@Before
    public void setup() {
    	testUserDto = new UserDto();
        List<String> avail = new ArrayList<>(Arrays.asList("Monday", "Tuesday"));
        testUserDto.setAvailability(avail);
        testUserDto.setEmail("testEmail@hotmail.com");
        testUserDto.setName("testUser");
        testUserDto.setPassword("password");
        List<PetDto> pets = new ArrayList<>();
        PetDto pet = new PetDto("Jackson",PetDto.PetType.Bird,"Test bird for testing");
        pets.add(pet);
        List<PetDto.PetType> prefs = new ArrayList<>();
        prefs.add(PetDto.PetType.Bird);
        testUserDto.setPetPreferences(prefs);
        testUserDto.setRating(3.8);
        testUserDto.setZipCode(76706);
        testUserDto.setUsername("testUser");
        testUserDto.setNumberOfRatings(1);
        testUserDto.setPets(pets);
    }
	@Test
	public void testGetPets() {
        List<PetDto.PetType> prefs = new ArrayList<>();
        prefs.add(PetDto.PetType.Bird);
		assertEquals(testUserDto.getPetPreferences(),prefs);
	}
	
	@Test
	public void testGetAvailability() {
		assertEquals(testUserDto.getAvailability(), new ArrayList<>(Arrays.asList("Monday", "Tuesday")));
	}
	
	@Test
	public void testGetEmail() {
		assertEquals(testUserDto.getEmail(), "testEmail@hotmail.com");
	}
	
	@Test
	public void testGetName() {
		assertEquals(testUserDto.getName(), "testUser");
	}
	
	@Test
	public void testGetUsername() {
		assertEquals(testUserDto.getUsername(), "testUser");
	}
	
	@Test
	public void testGetNumberOfRatings() {
		assertEquals(testUserDto.getNumberOfRatings(),1);
	}
	
	@Test
	public void testGetRating() {
		assertEquals(testUserDto.getRating(),3.8,DELTA);
	}
	
	@Test
	public void testGetZipcode() {
		assertEquals(testUserDto.getZipCode(),76706);
	}
    
	@Test
	public void testGetPassword() {
		assertEquals(testUserDto.getPassword(), "password");
	}

    
}

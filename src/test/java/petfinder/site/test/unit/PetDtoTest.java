package petfinder.site.test.unit;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


import static org.junit.Assert.assertEquals;

import petfinder.site.common.pet.PetDto;

@RunWith(SpringJUnit4ClassRunner.class)
public class PetDtoTest {
	private PetDto testPetDto;

    @Before
    public void setup() {
    	testPetDto = new PetDto("Jackson", PetDto.PetType.Bird, "Test bird for testing");
    }
    
    @Test
    public void test() {
    	assertEquals(testPetDto.getDescription(),"Test bird for testing");

    }
    
    @Test
    public void testGetName() {
    	assertEquals(testPetDto.getName(), "Jackson");
    }
    
    @Test
    public void testGetType() {
    	assertEquals(testPetDto.getType(), PetDto.PetType.Bird);
    }
    
}

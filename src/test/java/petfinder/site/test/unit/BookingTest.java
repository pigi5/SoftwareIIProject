package petfinder.site.test.unit;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;


import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


import static org.junit.Assert.assertEquals;

import java.util.ArrayList;

import java.util.Date;
import java.util.List;

import petfinder.site.common.booking.Booking;
import petfinder.site.common.pet.PetDto;


@RunWith(SpringJUnit4ClassRunner.class)
public class BookingTest {
	
	private Booking testBooking;
	private static final double DELTA = 1e-15;

    @Before
    public void setup() {
        List<PetDto> bookPets = new ArrayList<>();
        PetDto testPet = new PetDto("Jackson",PetDto.PetType.Dog); 
        testPet.setDescription("Test description for testing");
        bookPets.add(testPet);
        
        Date date = new Date();
        long mills = date.getTime();

        testBooking = new Booking("bookingOwner", "bookingSitter", bookPets, mills, mills, true, false, 3.8, false);
    }
    @Test
    public void testGetStartDate() {
    	assertEquals(testBooking.getStartDate(),new Date().getTime());
    }
    @Test
    public void testGetEndDate() {
    	assertEquals(testBooking.getStartDate(),new Date().getTime());
    }
    @Test
    public void testGetEndedFalse() {
    	assertEquals(testBooking.getEnded(),false);
    }
    @Test
    public void testGetOwnerRating() {
    	assertEquals(testBooking.getOwnerRating(),3.8,DELTA);
    }

    @Test
    public void testGetOwnerUsername() {
    	assertEquals(testBooking.getOwnerUsername(), "bookingOwner");
    }
    
    @Test
    public void testGetSitterUsername() {
    	assertEquals(testBooking.getSitterUsername(), "bookingSitter");
    }
    
    @Test
    public void testGetSitterApproveDecline() {
    	assertEquals(testBooking.getSitterApprove(),true);
    	assertEquals(testBooking.getSitterDecline(),false);
    }
    
    @Test
    public void testGetPetsSit() {
        PetDto testPet = new PetDto("Jackson",PetDto.PetType.Dog);
        testPet.setDescription("Test description for testing");
        List<PetDto> bookPet = testBooking.getPetsSit();
        assertEquals(testPet.getName(),bookPet.get(0).getName());
        assertEquals(testPet.getType(),bookPet.get(0).getType());
        assertEquals(testPet.getDescription(),bookPet.get(0).getDescription());
    }
    
}

import React from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from 'js/registermodal';
import LoginModal from 'js/loginmodal';
import MyNavbar from 'js/navbar';
import { Carousel, PageHeader, Grid, Row, Col, Button } from 'react-bootstrap';

export class Home extends React.Component {
    render() {
        console.log(JSON.stringify(this.props, null, 4));
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className="container">
                    <Carousel>
                        <Carousel.Item>
                            <img alt="Tempeturs" src="https://az616578.vo.msecnd.net/files/responsive/embedded/any/desktop/2016/10/10/636116545535774772-190236060_kittens.jpg" />
                            <Carousel.Caption>
                                <h1>Tempeturs</h1>
                                <h3>- Pet-Sitting Services -</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt="Need a sitter?" src="http://262f1527b4cc0b7ecec8-8c0e83a13bc8c5abf51c3c0744ac5234.r72.cf1.rackcdn.com/lps/assets/u/dog-cavalier-king-charles-spaniel-funny-pet-162167.jpeg" />
                            <Carousel.Caption>
                                <h2>Need a sitter?</h2>
                                <h4>Sign up to find an available pet sitter near you.</h4>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt="Want to be a sitter?" src="http://1.bp.blogspot.com/-btvO5UMNMS0/Vphlz_Gq9XI/AAAAAAAACu0/1w27XjMQByg/s1600/pets%2B%25286%2529.jpg" />
                            <Carousel.Caption>
                                <h2>Want to be a sitter?</h2>
                                <h4>Sign up so that owners can request your pet-sitting services.</h4>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        );
    }
}

export class HelpPage extends React.Component {
    render() {
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <PageHeader>
                        Help
                    </PageHeader>
                    <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
                        <legend><h2>Getting Started</h2></legend>
                        <p className="indented-text">
                            A new user must create an account to use Tempeturs and will have to go through the registration process. 
                            You start the process by clicking the “Register” button on the top right of the page. The “First Time Registration” 
                            dialog will then pop up, and you will need to enter:
                        </p>
                        <ul>
                            <li>Unique Username</li>
                            <li>Password</li>
                            <li>Full Name</li>
                            <li>Email</li>
                            <li>Zip Code</li>
                        </ul>
                        <p className="indented-text">
                            Once you complete the form, click “Register” to become an official Tempeturs user, which allows you to utilize all 
                            owner and sitter abilities that our application has to offer.
                        </p>
                        <p className="indented-text">
                            After this, and each time you visit the website, click “Login” on the navigation bar, enter your username and password, 
                            then click the “Login” button at the bottom of the form to sign in.
                        </p>
                        <legend className="top-buffer-md"><h2>Using the Site</h2></legend>
                        <h3><strong>Profile</strong></h3>
                        <p className="indented-text">
                            In order to get started with Tempeturs, you need to update your profile. Navigate to your user profile by clicking on 
                            your username at the top right of the navigation bar.
                        </p>
                        <p className="indented-text">
                            This will send you to your profile page, where you can update your information, add your pets, and specify your 
                            preferences as a pet-sitter, if you choose. There are three sections: General, Owner, and Sitter. 
                        </p>
                        <h3><strong>General Settings</strong></h3>
                        <p className="indented-text">
                            In the General tab of your profile, you can edit all of your basic, personal information. From here, press the pencil 
                            icon next to the information you want to edit, then type the new information into the text field. Once you are finished 
                            editing all your information, press the “Save” button at the bottom and it will automatically update your information.
                        </p>
                        <h3><strong>Owner Settings</strong></h3>
                        <p>
                            If you are using this application this application to find a pet sitter for your pets, you need to add your pets to 
                            your profile first.
                        </p>
                        <p><strong>Edit/Add/Delete Pets</strong></p>
                        <p className="indented-text">
                            In the Owner tab of your profile, you can edit a current pet, add a new pet, or delete a previous pet. 
                        </p>
                        <p className="indented-text">
                            To edit a pet, press the pencil button below the pet form, then type the new information into the fields.
                        </p>
                        <p className="indented-text">
                            To delete a pet, just click the red button below the pet form, then click the “Save” button.
                        </p>
                        <p><strong>Owner Dashboard</strong></p>
                        <p className="indented-text">
                            Once you have added your pets that you want to be sat, you can now search for a sitter. To do this, go to your 
                            Owner Dashboard by clicking the “Owner Dashboard” button on the navigation bar. The Owner Dashboard groups together 
                            all of your action items as a pet owner. 
                        </p>
                        <p className="indented-text">
                            There are three tabs in the Owner Dashboard: Notifications, Bookings, and Pets.
                        </p>
                        <p className="indented-text"><strong>Owner Notifications</strong></p>
                        <p className="indented-text">
                            The Notifications tab in the Owner Dashboard stores a notification for every action that happens related to your 
                            pet-sitting appointments; You will receive a notification whenever you request an appointment, whenever a sitter 
                            confirms or denies your request, whenever an appointment is completed, and whenever your sitter sends you a message 
                            about an appointment. You can view more information about each notification by clicking on the title of the notification. 
                        </p>
                        <p className="indented-text">
                            Once an appointment is complete, you will receive a notification asking you to rate the sitter for that appointment. 
                            Simply open the notification by clicking the title, select 0 through 5 paws based on their performance, then click the 
                            green check to confirm the rating.
                        </p>
                        <p className="indented-text"><strong>Owner Bookings</strong></p>
                        <p className="indented-text">
                            The Bookings tab in the Owner Dashboard stores information about all current/upcoming scheduled and requested bookings 
                            with a sitter. This is also where you start looking for a sitter to sit your pets! Start search for available sitters 
                            by pressing the “Start Booking” button.
                        </p>
                        <p className="indented-text">
                            Once you click the “Start Booking” button, you will be sent to a page that lets you specify for which of your pets and 
                            on what dates you need a sitter. Once you finish filling out the form, press “Search”, and you will be brought to a page 
                            with sitters that match your request. Just click “Request” under the sitter of your choice to send them a request.
                        </p>
                        <p className="indented-text">
                            After the sitter accepts your appointment request, you can message them with extra details by clicking the blue 
                            “Message” button to the right of their name in the booking information card on your Owner Dashboard. Then, type a 
                            message in the dialog and click “Send”.
                        </p>
                        <p className="indented-text"><strong>Owner Pets</strong></p>
                        <p className="indented-text">
                            The Pets tab in Owner Dashboard shows you all of your pets that can be sat. Here, you can start searching for a sitter 
                            for a specific pet by clicking on the “Start Booking” button under any of your pets. (For more information on searching 
                            for a sitter see “Owner Bookings” above)
                        </p>
                        <h3><strong>Sitter Settings</strong></h3>
                        <p>
                            If you are using this application to find pet owners with pets that need sitting, you need to set your availability and 
                            pet preferences. 
                        </p>
                        <p><strong>Set Availability & Pet Preferences</strong></p>
                        <p className="indented-text">
                            In the Sitter tab of your profile, you can set your weekly availability and the types of pets you wish to sit. To set 
                            the information, simply click the button for each day of the week you are available and type of pet you want to sit. If 
                            the button is blue, that means you have selected that item. Remember that if you do not set at least available day and 
                            one pet type, an owner will not be able to find you when searching for a sitter.
                        </p>
                        <p className="indented-text">
                            Once you are done making changes, click the “Save” button.
                        </p>
                        <p><strong>Sitter Dashboard</strong></p>
                        <p className="indented-text">
                            Once you have set your sitter preferences you can start receiving booking requests from owners to start sitting pets. 
                            To find these requests, go to your Sitter Dashboard by clicking the “Sitter Dashboard” button on the navigation bar. 
                            The Sitter Dashboard groups together all of your action items as a pet sitter. 
                        </p>
                        <p className="indented-text">
                            There are two tabs in the Sitter Dashboard: Notifications, and Bookings.
                        </p>
                        <p className="indented-text"><strong>Sitter Notifications</strong></p>
                        <p className="indented-text">
                            The Notifications tab in the Sitter Dashboard stores a notification for every action that happens related to your 
                            pet-sitting appointments; You will receive a notification whenever someone requests your services, whenever you accept 
                            or decline a request, and whenever an owner sends you a message about an appointment. You can view more information 
                            about each notification by clicking on the title of the notification.
                        </p>
                        <p className="indented-text"><strong>Sitter Bookings</strong></p>
                        <p className="indented-text">
                            The Bookings tab in the Sitter Dashboard stores information about all current/upcoming scheduled and requested bookings 
                            with an owner. This is also where you accept and deny requests for your pet sitting services. Every pending request will 
                            have an “Accept” and “Decline” button below it. Declined requests will be removed from your dashboard. After you accept 
                            an appointment request, you can message the owner for details by clicking the blue “Message” button to the right of their 
                            name in the booking information card. Then, type a message in the dialog and click “Send”.
                        </p>
                    </Col>
                </div>
            </div>
        );
    }
}
export class NotFoundPage extends React.Component {
    render() {
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <PageHeader>
                        Error 404
                    </PageHeader>
                    <p>That page could not be found.</p>
                </div>
            </div>
        );
    }
}
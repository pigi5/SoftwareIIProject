import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';
import { PageHeader, Nav, NavItem, Tab, Grid, Row, Col, Button, Panel, PanelGroup, Badge, Alert, Well, Modal } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { mapPetToPetForm } from 'js/startappointment';

class OwnerDashboard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            bookings: [],
            bookingsState: 2, // 0 is refreshing, 1 is error, 2 is good
            profileState: 2,
            ratings: new Array(this.props.userData.ownerNotifications.length).fill(0),
            messageBooking: null,
            messageOpen: false,
            messageContent: '',
            messageStatus: 0
        };
    }
    
    componentDidMount() {
        this.refreshOwnerInfo();
    }
    
    refreshOwnerInfo() {
        this.setState({bookingsState: 0, profileState: 0});
        
        axios.get('/api/bookings/ownerbookings')
            .then((response) => {                
                axios.get('/api/users/refresh')
                    .then((response2) => {
                        if (!Array.isArray(response.data)) {
                            response.data = [];
                        }
                        // find out if the booking has been rated for complete notifications
                        response2.data.ownerNotifications.forEach((notification, index) => {
                            if (notification.notificationType === 'COMPLETE') {
                                var matchingBookingIndex = response.data.findIndex((element) => element.id == notification.bookingID);
                                notification.ownerRated = (matchingBookingIndex >= 0 && response.data[matchingBookingIndex].ownerRating >= 0);
                            }
                        });

                        response.data.sort((a, b) => b.startDate - a.startDate);
                        
                        this.props.dispatch({
                            type: 'UPDATE_USER',
                            userData: response2.data
                        });
                        console.log(response.data);
                        this.setState({bookings: response.data, bookingsState: 2, profileState: 2, ratings: new Array(response2.data.ownerNotifications.length).fill(0)});
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({profileState: 1, ratings: new Array(this.props.userData.ownerNotifications.length).fill(0)});
                    });
            })
            .catch((error) => {
                console.log(error);
                this.setState({bookings:[], bookingsState: 1});
            });
    }
    
    createPetCard(curVal, index) {
        var extra;
        if (curVal.description) {
            extra = (<span><hr /> <p>{curVal.description}</p></span>);
        }
        return (
            <Col key={index} sm={6} lg={4}>
                <Panel bsStyle="info" header={curVal.name} footer={(<Button bsStyle="success" href="/#/startappt" onClick={() => this.startBookingWithPet(curVal)}>Start Booking</Button>)}>
                    <h4>{curVal.type}</h4>
                    {extra}
                </Panel>
            </Col>
        );
    }
    
    startBookingWithPet(pet) {
        var newForms = this.props.userData.pets.map(mapPetToPetForm);
        for (var i = 0; i < newForms.length; i++) {
            if (newForms[i].name !== pet.name || newForms[i].type !== pet.type) {
                newForms[i].checked = false;
            }
        }
        this.props.dispatch({
            type: 'UPDATE_BOOKING',
            bookingData: {petForms: newForms}
        });
    }

    startMessage(booking) {
        this.setState({messageBooking: booking, messageOpen: true, messageContent: ''});
    }
    closeMessage() {
        this.setState({messageBooking: null, messageOpen: false, messageContent: ''});
    }
    changeMessage(event) {
        this.setState({messageContent: event.target.value});
    }
    sendMessage() {
        if (this.state.messageBooking !== null && 
                this.state.messageBooking.sitterUsername !== 'undefined' &&
                this.state.messageContent !== '') {
            axios.post('/api/bookings/messagesitter', null, {
                params: {
                    bookingID: this.state.messageBooking.id,
                    sitterUsername: this.state.messageBooking.sitterUsername,
                    message: this.state.messageContent
                }
            })
            .then((response) => {
                this.setState({messageStatus: 0});
                this.closeMessage();
            })
            .catch((error) => {
                if (error.response !== 'undefined') {
                    this.setState({messageStatus: error.response.status});
                }
            });
        } else {
            this.setState({messageStatus: -1});
        }
    }
    
    createBookingCard(curVal, index) {
        var startDate = new Date(curVal.startDate);
        var endDate = new Date(curVal.endDate);
        var status;
        var color;
        var extra = null;
        if (curVal.sitterApprove) {
            status = 'Booked';
            extra = (
                    <Button bsStyle="primary" className="pull-right" onClick={() => this.startMessage(curVal)}>
                        <span>Message</span>
                        <i className="fa fa-paper-plane fa-fw pull-left center-icon-vertical" aria-hidden="true" />
                    </Button>
                );
            color = 'info';
        } else {
            status = 'Pending';
            color = 'warning';
        }
        return (
            <Col key={index} md={10} mdOffset={1} lg={8} lgOffset={2}>
                <Panel header={startDate.toLocaleDateString('en-US') + ' to ' + endDate.toLocaleDateString('en-US')} footer={status} bsStyle={color}>
                    <div className="booking-name">
                        <h4>Booking with <strong>{curVal.sitterUsername}</strong></h4>
                        {extra}
                    </div>
                    <hr style={{marginTop: 10}} />
                    <p>For:</p>
                    <ul>
                        {curVal.petsSit.map((petVal, ind) => (
                            <li key={ind}><strong>{petVal.name}</strong> <small>({petVal.type})</small></li>
                        ))}
                    </ul>
                </Panel>
            </Col>
        );
    }
    
    markIsRead(index, isRead) {
        if (!this.props.userData.ownerNotifications[index].isRead) {
            var newNotifications = this.props.userData.ownerNotifications.slice();
            newNotifications[index].isRead = isRead;
            var updates = {ownerNotifications: newNotifications};
    
            axios.post('/api/users/update', updates)
                .then((response) => {
                    this.props.dispatch({
                        type: 'UPDATE_USER',
                        userData: updates
                    });
                })
                .catch((error) => {
                });
        }
    }
    
    changeStars(index, val) {
        var newRatings = this.state.ratings.slice();
        newRatings[index] = val; 
        this.setState({ratings: newRatings});
    }
    
    rateSitter(bookingID, rating) {
        axios.post('/api/bookings/ratesitter', null, {
                params: {
                    bookingID: bookingID,
                    rating: rating
                }
            })
            .then((response) => {
                this.refreshOwnerInfo();
            })
            .catch((error) => {
            });
    }
    
    createNotificationCard(curVal, index) {
        var notificationDate = new Date(curVal.notificationDate);
        var color;
        var status;
        var notificationIcon;
        if (curVal.isRead) {
            notificationIcon = 'fa-bell-o';
            if (curVal.notificationType === 'MESSAGE') {
                notificationIcon = 'fa-envelope-o';
            }
            status = (<i className={'fa ' + notificationIcon + ' fa-fw pull-left center-icon-vertical'} />);
            color = 'default';
        } else {
            notificationIcon = 'fa-bell';
            if (curVal.notificationType === 'MESSAGE') {
                notificationIcon = 'fa-envelope';
            }
            status = (<i className={'fa ' + notificationIcon + ' fa-fw pull-left center-icon-vertical'} />);
            color = 'warning';
        }
        var extra = null;
        if (curVal.notificationType === 'COMPLETE') {
            if (curVal.ownerRated) {
                extra = (<Row className="vertical-align">
                            <div className="col">
                                <Well bsSize="sm">Rating registered.</Well>
                            </div>
                         </Row>);  
            } else {
                extra = (<Row className="vertical-align">
                            <div className="col">
                                <Button bsStyle="danger" onClick={() => this.changeStars(index, 0)}>
                                    <i className="fa fa-ban fa-lg" />
                                </Button>
                            </div>
                            <div className="col" style={{paddingTop: 5, marginLeft: 10, marginRight: 10}}>
                                <StarRatingComponent 
                                    name={'rating' + index} 
                                    value={this.state.ratings[index]}
                                    emptyStarColor="#DDD"
                                    onStarClick={(nextVal, prevVal, name) => this.changeStars(index, nextVal)}
                                    renderStarIcon={() => (<i className="fa fa-paw fa-fw fa-2x center-icon-vertical" />)}
                                />
                            </div>
                            <div className="col">
                                <Button bsStyle="success" onClick={() => this.rateSitter(curVal.bookingID, this.state.ratings[index])}>
                                    <i className="fa fa-check fa-lg" />
                                </Button>
                            </div>        
                        </Row>);             
            }
        }
        return (
            <Panel key={index} eventKey={index} header={
                    <div>
                        <span>{curVal.title}</span>
                        <span className="pull-right">{notificationDate.toLocaleString('en-US')}</span>
                        {status}
                    </div>} onSelect={event => this.markIsRead(index, true)} bsStyle={color}>
                <p>{curVal.message}</p>
                {extra}
            </Panel>
        );
    }
    
    render() {
        var refreshClass = 'fa-refresh ';
        if (this.state.bookingState === 0 || this.state.profileState === 0) {
            refreshClass = 'fa-refresh fa-spin ';
        } else if (this.state.bookingState === 1 || this.state.profileState === 1) {
            refreshClass = 'fa-exclamation-circle text-danger ';
        }
        
        var numNewNots = this.props.userData.ownerNotifications.filter(notification => !notification.isRead).length;
        
        var notifications;
        if (this.props.userData.ownerNotifications.length > 0) {
            notifications = (
                <PanelGroup accordion>
                    {this.props.userData.ownerNotifications.map((curVal, index) => this.createNotificationCard(curVal, index))}
                </PanelGroup>
                );
        } else {
            notifications = (<Alert bsStyle="info">You have no notifications.</Alert>);
        }

        var bookings;
        if (this.state.bookings.length > 0) {
            bookings = this.state.bookings.map((curVal, index) => this.createBookingCard(curVal, index));
        } else {
            bookings = (
                    <Col md={10} mdOffset={1} lg={8} lgOffset={2}>
                        <Alert bsStyle="info">You have no upcoming bookings. Click the button above to set up an appointment.</Alert>
                    </Col>
                );
        }

        var pets;
        if (this.props.userData.pets.length > 0) {
            pets = (
                    <Col sm={10} smOffset={1} lg={8} lgOffset={2}>
                        <Row className="equal-height">
                            {this.props.userData.pets.map((curVal, index) => this.createPetCard(curVal, index))}
                        </Row>
                    </Col>
                );
        } else {
            pets = (
                    <Col md={10} mdOffset={1} lg={8} lgOffset={2}>
                        <Alert bsStyle="info">You have no pets. Go to your profile to add pets!</Alert>
                    </Col>
                );
        }
        
        var messageError = null;
        if (this.state.messageStatus == 500) {
            messageError = (<p className='text-danger text-center top-buffer-sm'>Server error. Please try again later.</p>);
        } else if (this.state.messageStatus == 200) {
            messageError = (<p className='text-success text-center top-buffer-sm'>Message sent.</p>);
        } else if (this.state.generalStatus == -1) {
            messageError = (<p className='text-danger text-center'>You must type a message.</p>);
        } else if (this.state.messageStatus != 0) {
            messageError = (<p className='text-danger text-center top-buffer-sm'>An unknown error occurred.</p>);
        }
        
        return(
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <Grid>
                    <PageHeader>
                        <Row style={{display: 'flex', alignItems: 'flex-end'}}>
                            <Col xs={7} sm={9} lg={10}>
                                <span>Owner Dashboard</span>
                            </Col>
                            <Col xs={5} sm={3} lg={2}>
                                <Button block onClick={() => this.refreshOwnerInfo()}>
                                    <span>Refresh</span>
                                    <i className={'fa ' + refreshClass + 'pull-left center-icon-vertical'} />
                                </Button>
                            </Col>
                        </Row>
                    </PageHeader>
                    <Tab.Container id="profile-tabs" defaultActiveKey={1}>
                        <Row className="clearfix">
                            <Col sm={3} lg={2}>
                                <Nav bsStyle="pills" stacked>
                                    <NavItem eventKey={1}>Notifications <Badge pullRight>{numNewNots}</Badge></NavItem>
                                    <NavItem eventKey={2}>Bookings</NavItem>
                                    <NavItem eventKey={3}>Pets</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={9} lg={10}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey={1}>
                                        <Row className="top-buffer-sm">
                                            <Col md={10} mdOffset={1} lg={8} lgOffset={2}>
                                                {notifications}
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={2}>
                                        <Row className="top-buffer-sm">
                                            <Col md={10} mdOffset={1} lg={8} lgOffset={2}>
                                                <Button block bsSize="lg" bsStyle="success" href="/#/startappt">
                                                    <span>Start Booking</span>
                                                    <i className="fa fa-plus pull-left center-icon-vertical" />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row className="top-buffer-sm">
                                            {bookings}
                                        </Row>

                                        <Modal show={this.state.messageOpen} onHide={() => this.closeMessage()}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Send Message to {this.state.messageBooking != null ? this.state.messageBooking.sitterUsername : ''}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="padded-modal">
                                                <div className="input-group message-input-group">
                                                    <textarea className="form-control message-input" name="message" type="text" placeholder="Message" value={this.state.messageContent} onChange={(event) => this.changeMessage(event)} />
                                                </div>
                                                {messageError}
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={() => this.closeMessage()}>Cancel</Button>
                                                <Button onClick={(event) => this.sendMessage(event)} bsStyle="success" disabled={this.state.messageContent === ''}>
                                                    <span>Send</span>
                                                    <i className="fa fa-paper-plane fa-fw pull-left center-icon-vertical" aria-hidden="true" />
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={3}>
                                        <Row className="top-buffer-sm">
                                            {pets}
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        authed: store.user.authed,
        userData: store.user.userData
    };
};

export default connect(mapStateToProps)(OwnerDashboard);
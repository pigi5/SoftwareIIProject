import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';
import { PageHeader, Nav, NavItem, Tab, Grid, Row, Col, Button, Panel, Badge, Alert } from 'react-bootstrap';
import { mapPetToPetForm } from 'js/startappointment';

class OwnerDashboard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            bookings: [],
            bookingsState: 2, // 0 is refreshing, 1 is error, 2 is good
            profileState: 2 
        };
    }
    
    componentDidMount() {
        this.refreshOwnerInfo();
    }
    
    refreshOwnerInfo() {
        this.setState({bookingsState: 0, profileState: 0});
        
        axios.get('/api/bookings/ownerbookings', {
                params: {
                    username: this.props.userData.username
                }
            })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    response.data.sort((a, b) => b.endDate - a.endDate);
                    this.setState({bookings: response.data, bookingsState: 2});
                }
            })
            .catch((error) => {
                this.setState({bookings:[], bookingsState: 1});
            });
        axios.get('/api/users/user', {
                params: {
                    username: this.props.userData.username
                }
            })
            .then((response) => {
                this.props.dispatch({
                    type: 'UPDATE_USER',
                    userData: response.data
                });
                this.setState({profileState: 2});
            })
            .catch((error) => {
                this.setState({profileState: 1});
            });
    }
    
    createPetCard(curVal, index) {
        var extra;
        if (curVal.description) {
            extra = (<span><hr /> <p>{curVal.description}</p></span>);
        }
        return (
            <Col key={index} xs={12} sm={6} md={4}>
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
    
    createBookingCard(curVal, index) {
        var startDate = new Date(curVal.startDate);
        var endDate = new Date(curVal.endDate);
        var status;
        var color;
        if (curVal.sitterApprove) {
            status = 'Booked';
            color = 'info';
        } else {
            status = 'Pending';
            color = 'warning';
        }
        return (
            <Col key={index} sm={8} md={6} mdOffset={2} lgOffset={1}>
                <Panel header={startDate.toLocaleDateString('en-US') + ' to ' + endDate.toLocaleDateString('en-US')} footer={status} bsStyle={color}>
                    <h4>Booking with <strong>{curVal.sitterUsername}</strong></h4>
                    <hr />
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
        var newNotifications = this.props.userData.notifications.slice();
        newNotifications[index].isRead = isRead;
        var updates = {notifications: newNotifications};

        axios.post('/api/users/update', updates, {
                params: {
                    username: this.props.userData.username
                }
            })
            .then((response) => {
                this.props.dispatch({
                    type: 'UPDATE_USER',
                    userData: updates
                });
            })
            .catch((error) => {
            });
    }
    
    createNotificationCard(curVal, index) {
        var notificationDate = new Date(curVal.notificationDate);
        var color;
        var status;
        var statusButton;
        if (curVal.isRead) {
            status = (<i className="fa fa-envelope pull-left center-icon-vertical" />);
            statusButton = (
                <Button onClick={() => this.markIsRead(index, false)}>
                    <span>Mark Unread</span>
                </Button>
            );
            color = 'default';
        } else {
            status = (<i className="fa fa-envelope-open pull-left center-icon-vertical" />);
            statusButton = (
                    <Button onClick={() => this.markIsRead(index, true)}>
                        <span>Mark Read</span>
                        <i className="fa fa-envelope-open pull-left center-icon-vertical" />
                    </Button>
                );
            color = 'warning';
        }
        return (
            <Col key={index} sm={8} md={6} mdOffset={2} lgOffset={1}>
                <Panel header={<div><span>{notificationDate.toLocaleString('en-US')}</span>{status}</div>} footer={statusButton} bsStyle={color}>
                    <p>{curVal.message}</p>
                </Panel>
            </Col>
        );
    }
    
    render() { 
        var refreshClass = 'fa-refresh ';
        if (this.state.bookingState === 0 || this.state.profileState === 0) {
            refreshClass = 'fa-refresh fa-spin ';
        } else if (this.state.bookingState === 1 || this.state.profileState === 1) {
            refreshClass = 'fa-exclamation-circle text-danger ';
        }
        
        var numNewNots = this.props.userData.notifications.filter(notification => !notification.isRead).length;
        
        var notifications;
        if (this.props.userData.notifications.length > 0) {
            notifications = this.props.userData.notifications.map((curVal, index) => this.createNotificationCard(curVal, index));
        } else {
            notifications = (
                    <Col sm={8} md={6} mdOffset={2} lgOffset={1}>
                        <Alert bsStyle="info">You have no notifications.</Alert>
                    </Col>
                );
        }

        var bookings;
        if (this.state.bookings.length > 0) {
            bookings = this.state.bookings.map((curVal, index) => this.createBookingCard(curVal, index));
        } else {
            bookings = (
                    <Col sm={8} md={6} mdOffset={2} lgOffset={1}>
                        <Alert bsStyle="info">You have no bookings. Click the button above to set up an appointment.</Alert>
                    </Col>
                );
        }

        var pets;
        if (this.state.bookings.length > 0) {
            pets = (
                    <Col sm={10} lg={8}>
                        <Row className="equal-height">
                            {this.props.userData.pets.map((curVal, index) => this.createPetCard(curVal, index))}
                        </Row>
                    </Col>
                );
        } else {
            pets = (
                    <Col sm={8} md={6} mdOffset={2} lgOffset={1}>
                        <Alert bsStyle="info">You have no pets. Go to your profile to add pets!</Alert>
                    </Col>
                );
        }
        
        
        return(
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <Grid>
                    <PageHeader>
                        <Row style={{display: 'flex', alignItems: 'flex-end'}}>
                            <Col xs={7} sm={9} md={10}>
                                <span>Owner Dashboard</span>
                            </Col>
                            <Col xs={5} sm={3} md={2}>
                                <Button block onClick={() => this.refreshOwnerInfo()}>
                                    <span>Refresh</span>
                                    <i className={'fa ' + refreshClass + 'pull-left center-icon-vertical'} />
                                </Button>
                            </Col>
                        </Row>
                    </PageHeader>
                    <Tab.Container id="profile-tabs" defaultActiveKey={1}>
                        <Row className="clearfix">
                            <Col sm={3} md={2}>
                                <Nav bsStyle="pills" stacked>
                                    <NavItem eventKey={1}>Notifications <Badge pullRight>{numNewNots}</Badge></NavItem>
                                    <NavItem eventKey={2}>Bookings</NavItem>
                                    <NavItem eventKey={3}>Pets</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={9} md={10}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey={1}>
                                        <Grid>
                                            <Row className="top-buffer-sm">
                                                {notifications}
                                            </Row>
                                        </Grid>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={2}>
                                        <Grid>
                                            <Row className="top-buffer-sm">
                                                <Col sm={8} md={6} mdOffset={2} lgOffset={1}>
                                                    <Button block bsSize="lg" bsStyle="success" href="/#/startappt">
                                                        <span>Start Booking</span>
                                                        <i className="fa fa-plus pull-left center-icon-vertical" />
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row className="top-buffer-sm">
                                                {bookings}
                                            </Row>
                                        </Grid>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={3}>
                                        <Grid>
                                            <Row className="top-buffer-sm">
                                                {pets}
                                            </Row>
                                        </Grid>
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
        userData: store.user.userData,
        booking: store.user.booking
    };
};

export default connect(mapStateToProps)(OwnerDashboard);
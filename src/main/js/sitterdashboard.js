import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';
import { PageHeader, Nav, NavItem, Tab, Grid, Row, Col, Button, PanelGroup, Panel, Alert, Badge } from 'react-bootstrap';

class SitterDashboard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            bookings: [],
            bookingsState: 2, // 0 is refreshing, 1 is error, 2 is good
            profileState: 2 
        };
    }
    
    componentDidMount() {
        this.refreshSitterInfo();
    }
    
    refreshSitterInfo() {
        this.setState({bookingsState: 0, profileState: 0});
        
        axios.get('/api/bookings/sitterbookings')
            .then((response) => {                
                axios.get('/api/users/refresh')
                    .then((response2) => {
                        if (!Array.isArray(response.data)) {
                            response.data = [];
                        }

                        response.data.sort((a, b) => b.startDate - a.startDate);
                        
                        this.props.dispatch({
                            type: 'UPDATE_USER',
                            userData: response2.data
                        });
                        console.log(response.data);
                        this.setState({bookings: response.data, bookingsState: 2, profileState: 2});
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({profileState: 1});
                    });
            })
            .catch((error) => {
                console.log(error);
                this.setState({bookings:[], bookingsState: 1});
            });
    }
    
    finalizeBooking(booking, approve) {
        axios.post('/api/bookings/finalizebooking', null, {
                params: {
                    bookingID: booking.id,
                    approve: approve
                }
            })
            .then((response) => {
                var bookingsClone = this.state.bookings.slice();
                var index = bookingsClone.findIndex(element => element.id === booking.id);
                if (index >= 0) {
                    if (approve) {
                        bookingsClone[index].sitterApprove = true; 
                    } else {
                        bookingsClone.splice(index, 1); 
                    }
                    this.setState({bookings: bookingsClone});
                } else {
                    console.log('Error: Booking ' + booking.id + ' was successfully finalized on the server-side, but it could not be found in local memory.');
                }
            })
            .catch((error) => {
                console.log(error.response);
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
            status = (
                    <Row>
                        <Col xs={6}>
                            <Button block bsStyle="success" onClick={() => this.finalizeBooking(curVal, true)}>Accept</Button>
                        </Col>
                        <Col xs={6}>
                            <Button block bsStyle="danger" onClick={() => this.finalizeBooking(curVal, false)}>Decline</Button>
                        </Col>
                    </Row>
            );
            color = 'warning';
        }
        return (
            <Col key={index} sm={8} md={6} mdOffset={2} lgOffset={1}>
                <Panel header={startDate.toLocaleDateString('en-US') + ' to ' + endDate.toLocaleDateString('en-US')} footer={status} bsStyle={color}>
                    <h4>Booking with <strong>{curVal.ownerUsername}</strong></h4>
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
        var newNotifications = this.props.userData.sitterNotifications.slice();
        newNotifications[index].isRead = isRead;
        var updates = {sitterNotifications: newNotifications};

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
        return (
            <Panel key={index} eventKey={index} header={
                    <div>
                        <span>{curVal.title}</span>
                        <span className="pull-right">{notificationDate.toLocaleString('en-US')}</span>
                        {status}
                    </div>} onSelect={event => this.markIsRead(index, true)} bsStyle={color}>
                <p>{curVal.message}</p>
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
        
        var numNewNots = this.props.userData.sitterNotifications.filter(notification => !notification.isRead).length;
        
        var notifications;
        if (this.props.userData.sitterNotifications.length > 0) {
            notifications = this.props.userData.sitterNotifications.map((curVal, index) => this.createNotificationCard(curVal, index));
        } else {
            notifications = (
                    <Col sm={8} lg={6} lgOffset={1}>
                        <Alert bsStyle="info">You have no notifications.</Alert>
                    </Col>
                );
        }

        var bookings;
        if (this.state.bookings.length > 0) {
            bookings = this.state.bookings.map((curVal, index) => this.createBookingCard(curVal, index));
        } else {
            bookings = (
                    <Col sm={8} lg={6} lgOffset={1}>
                        <Alert bsStyle="info">You have no upcoming bookings.</Alert>
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
                                <span>Sitter Dashboard</span>
                            </Col>
                            <Col xs={5} sm={3} md={2}>
                                <Button block onClick={() => this.refreshSitterInfo()}>
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
                                </Nav>
                            </Col>
                            <Col sm={9} md={10}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey={1}>
                                        <Grid>
                                            <Row className="top-buffer-sm">
                                                <Col sm={8} lg={6} lgOffset={1}>
                                                    <PanelGroup accordion>
                                                        {notifications}
                                                    </PanelGroup>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={2}>
                                        <Grid>
                                            <Row className="top-buffer-sm">
                                                {bookings}
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
        userData: store.user.userData
    };
};

export default connect(mapStateToProps)(SitterDashboard);
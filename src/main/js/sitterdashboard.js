import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';
import { PageHeader, Nav, NavItem, Tab, Grid, Row, Col, Button, PanelGroup, Panel, Alert, Badge, Modal } from 'react-bootstrap';

class SitterDashboard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            bookings: [],
            bookingsState: 2, // 0 is refreshing, 1 is error, 2 is good
            profileState: 2,
            messageBooking: null,
            messageOpen: false,
            messageContent: '',
            messageStatus: 0
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
                this.state.messageBooking.ownerUsername !== 'undefined' &&
                this.state.messageContent !== '') {
            axios.post('/api/bookings/messageowner', null, {
                params: {
                    bookingID: this.state.messageBooking.id,
                    ownerUsername: this.state.messageBooking.ownerUsername,
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
        var extra;
        var color;
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
            <Col key={index} md={10} mdOffset={1} lg={8} lgOffset={2}>
                <Panel header={startDate.toLocaleDateString('en-US') + ' to ' + endDate.toLocaleDateString('en-US')} footer={status} bsStyle={color}>
                    <div className="booking-name">
                        <h4>Booking with <strong>{curVal.ownerUsername}</strong></h4>
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
        if (!this.props.userData.sitterNotifications[index].isRead) {
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
            notifications = (
                <PanelGroup accordion>
                    {this.props.userData.sitterNotifications.map((curVal, index) => this.createNotificationCard(curVal, index))}
                </PanelGroup>
                );
        } else {
            notifications = (<Alert bsStyle="info">You have no notifications.</Alert>);
        }

        var numPendingBookings = this.state.bookings.filter(booking => !booking.sitterApprove && !booking.sitterDecline).length;
        var bookingBadge = null;
        if (numPendingBookings > 0) {
            bookingBadge = (<Badge pullRight>{numPendingBookings}</Badge>);
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
                                <span>Sitter Dashboard</span>
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
                                    <NavItem eventKey={2}>Bookings {bookingBadge}</NavItem>
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
                                            {bookings}
                                        </Row>

                                        <Modal show={this.state.messageOpen} onHide={() => this.closeMessage()}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Send Message to {this.state.booking != null ? this.state.booking.ownerUsername : ''}</Modal.Title>
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
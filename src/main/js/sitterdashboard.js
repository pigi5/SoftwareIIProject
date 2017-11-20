import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';
import { PageHeader, Nav, NavItem, Tab, Grid, Row, Col, Button, Panel} from 'react-bootstrap';

class SitterDashboard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            bookings: []
        };
        
        this.refreshSitterInfo();
    }
    
    refreshSitterInfo() {
        axios.get('/api/users/sitterbookings', {
                params: {
                    username: this.props.userData.username
                }
            })
            .then((response) => {
                response.data.sort((a, b) => b.endDate - a.endDate);
                this.setState({bookings:response.data});
            })
            .catch((error) => {
                this.setState({bookings:[]});
            });
    }
    
    acceptBooking(booking, index) {
        axios.post('/api/users/updatebooking', {sitterApprove: true}, {
                params: {
                    bookingID: booking.id,
                }
            })
            .then((response) => {
                var bookingsClone = JSON.parse(JSON.stringify(this.state.bookings));
                bookingsClone[index].sitterApprove = true; 
                this.setState({bookings: bookingsClone});
            })
            .catch((error) => {
                
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
                            <Button block bsStyle="success" onClick={() => this.acceptBooking(curVal, index)}>Accept</Button>
                        </Col>
                        <Col xs={6}>
                            <Button block bsStyle="danger">Decline</Button>
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
    
    render() {
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
                                <Button block onClick={() => this.refreshSitterInfo()}>
                                    <span>Refresh</span>
                                    <i className="fa fa-refresh pull-left center-icon-vertical" />
                                </Button>
                            </Col>
                        </Row>
                    </PageHeader>
                    <Tab.Container id="profile-tabs" defaultActiveKey={1}>
                        <Row className="clearfix">
                            <Col sm={3} md={2}>
                                <Nav bsStyle="pills" stacked>
                                    <NavItem eventKey={1}>Notifications</NavItem>
                                    <NavItem eventKey={2}>Bookings</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={9} md={10}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey={1}>
                                        
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={2}>
                                        <Grid>
                                            <Row className="top-buffer-sm">
                                                {this.state.bookings.map((curVal, index) => this.createBookingCard(curVal, index))}
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
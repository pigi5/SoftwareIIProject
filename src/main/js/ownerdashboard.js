import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';
import { PageHeader, Nav, NavItem, Tab, Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import { mapPetToPetForm } from 'js/startappointment';

class OwnerDashboard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            bookings: []
        };
        
        this.refreshOwnerInfo();
    }
    
    refreshOwnerInfo() {
        axios.get('/api/users/ownerbookings', {
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
    
    render() { 
//        var booking = null;
//        if (this.props.userData.appointments.length > 0) {
//            booking = (<Badge>this.props.userData.appointments.length</Badge>);
//        }
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
                                    <NavItem eventKey={3}>Pets</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={9} md={10}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey={1}>
                                    
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
                                                {this.state.bookings.map((curVal, index) => this.createBookingCard(curVal, index))}
                                            </Row>
                                        </Grid>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={3}>
                                        <Grid>
                                            <Row className="top-buffer-sm">
                                                <Col sm={10} lg={8}>
                                                    <Row className="equal-height">
                                                        {this.props.userData.pets.map((curVal, index) => this.createPetCard(curVal, index))}
                                                    </Row>
                                                </Col>
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
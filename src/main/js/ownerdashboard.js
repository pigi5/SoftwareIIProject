import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';
import { PageHeader, Nav, NavItem, Tab, Grid, Row, Col, Button} from 'react-bootstrap';

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
                this.setState({bookings:response.data});
            })
            .catch((error) => {
                this.setState({bookings:[]});
            });
    }
    
    createPetCard(curVal, index) {
        return (
            <Col key={index} xs={12} sm={6} md={4}>
                <div className="sr-card">
                    <h3><strong>{curVal.name}</strong> <small>({curVal.type})</small></h3>
                    <p>{curVal.description}</p>
                </div>
            </Col>
        );
    }
    
    createBookingCard(curVal, index) {
        var startDate = new Date(curVal.startDate);
        var endDate = new Date(curVal.endDate);
        var status;
        var color;
        if (curVal.sitterApprove) {
            status = 'Booked';
            color = 'text-success';
        } else {
            status = 'Pending';
            color = 'text-warning';
        }
        return (
            <Col key={index} xs={12} smOffset={2} sm={8}>
                <div className="sr-card">
                    <h3>Booking with <strong>{curVal.sitterUsername}</strong> to sit:</h3>
                    <ul>
                        {curVal.petsSit.map((petVal, ind) => (
                            <li key={ind}><strong>{petVal.name}</strong> <small>({petVal.type})</small></li>
                        ))}
                    </ul>
                    <p>From {startDate.toLocaleDateString('en-US')} to {endDate.toLocaleDateString('en-US')}</p>
                    <p className={color + ' pull-right'}>{status}</p>
                </div>
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
                <div className='container'>
                    <PageHeader>
                        <span>Owner Dashboard</span>
                        <Button bsSize="lg" className="pull-right" onClick={() => this.refreshOwnerInfo()}>
                            <span>Refresh</span>
                            <i className="fa fa-refresh pull-left center-icon-vertical" />
                        </Button>
                    </PageHeader>
                    <Tab.Container id="profile-tabs" defaultActiveKey={1}>
                        <Row>
                            <Col sm={3} md={2}>
                                <Nav bsStyle="pills" stacked>
                                    <NavItem eventKey={1}>Bookings</NavItem>
                                    <NavItem eventKey={2}>Pets</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={9} md={10}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey={1}>
                                        <Grid>
                                            <Row className="top-buffer-sm">
                                                <Col sm={8} smOffset={1} md={6} mdOffset={2} lgOffset={1}>
                                                    <Button block bsSize="lg" bsStyle="success" href="/#/startappt">
                                                        <span>Start Booking</span>
                                                        <i className="fa fa-plus pull-left center-icon-vertical" />
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row className="top-buffer-sm">
                                                <Col sm={10} lg={8}>
                                                    {this.state.bookings.map((curVal, index) => this.createBookingCard(curVal, index))}
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={2}>
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
                </div>
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
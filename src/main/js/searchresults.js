import React from 'react';
import MyNavbar from 'js/navbar';
import { PageHeader, Grid, Row, Col, Button, Modal, Panel} from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import axios from 'axios';


function mapTypeFromPets(curVal, index) {
    return curVal.type;
}

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        
        this.getSitters();
        
        this.state = {
            sitters: [],
            selectedUsername: '',
            status: 0,
            searchStatus: 0
        };
    }
    
    getSitters() {
        // get search results from backend algorithm

        if (this.props.booking.hasOwnProperty('startDate') && this.props.booking.hasOwnProperty('endDate') && this.props.booking.hasOwnProperty('pets')) {

            axios.get('/api/users/match', {
                    params: {
                        startDate: this.props.booking.startDate,
                        endDate: this.props.booking.endDate,
                        zipCode: this.props.userData.zipCode,
                        petTypes: this.props.booking.pets.map(mapTypeFromPets)
                    }
                })
                .then((response) => {
                    if (!Array.isArray(response.data)) {
                        response.data = [];
                    }
                    response.data.sort((a, b) => b.rating - a.rating);
                    this.setState({sitters:response.data, searchStatus:response.status});
                })
                .catch((error) => {
                    if (typeof error.response !== 'undefined') {
                        this.setState({sitters:[], searchStatus:error.response.status});
                    }
                });

        }
    }
    
    createSitterCard(curVal, index) {
        /* TODO - this logic is for whenever the matching algorithm including how much percent of a match a sitter is
        var color;
        if (curVal.match > 0.66) {
            color = 'success';
        } else if (curVal.match > 0.33) {
            color = 'warning';
        } else {
            color = 'danger';
        }
        */
        
        return (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Panel bsStyle="success" header={<span>{curVal.name} <small>({curVal.username})</small></span>} footer={<Button onClick={() => this.request(curVal.username)} bsStyle="success" block>Request</Button>}>
                    <p>Zip: {curVal.zipCode}</p>
                    <Row className="vertical-align">
                        <div className="col" style={{paddingTop: 5, marginLeft: 10, marginRight: 10}}>
                            <StarRatingComponent 
                                name={'rating' + index} 
                                value={curVal.rating}
                                emptyStarColor="#DDD"
                                editing={false}
                                renderStarIcon={() => (<i className="fa fa-paw fa-fw fa-2x center-icon-vertical" />)}
                            />
                        </div>    
                    </Row>
                </Panel>
            </Col>
        );
    }

    close() {
        this.setState({ status: 0 });
    }

    request(username) {
        // logic to request appointment with sitter
        var bookingData = {
                ownerUsername: this.props.userData.username,
                sitterUsername: username,
                petsSit: this.props.booking.pets,
                startDate: this.props.booking.startDate,
                endDate: this.props.booking.endDate
        };
        
        if (bookingData.ownerUsername != '' &&
                bookingData.sitterUsername != '' &&
                bookingData.petsSit.length > 0  &&
                bookingData.startDate > 0 &&
                bookingData.endDate > 0) {
            axios.post('/api/bookings/book', bookingData)
                .then((response) => {
                    this.setState({status: response.status, selectedUsername: username});
                })
                .catch((error) => {
                    if (typeof error.response !== 'undefined') {
                        this.setState({status: error.response.status, selectedUsername: username});
                    }
                });
        } else {
            this.setState({status: -1, selectedUsername: username});
        }
    }
    
    render() {
        var results;
        if (this.state.sitters.length > 0) {
            results = (
                    <Row className="equal-height">
                        {this.state.sitters.map((curVal, index) => this.createSitterCard(curVal, index))}
                    </Row>
                );
        } else if (this.state.searchStatus >= 200 && this.state.searchStatus < 300) {
            results = (<h3>Sorry, there were no search results that match that query.</h3>);
        } else if (this.state.searchStatus === 0) {
            results = (
                    <Row className="vertical-align">
                        <div className="col">
                            <i className="fa fa-spinner fa-pulse fa-5x fa-fw" />
                        </div>
                    </Row>
                );
        } else {
            results = (
                    <div>
                        <h3>An unknown error occurred. (Code: {this.state.searchStatus})</h3>
                        <h3>Please try again later.</h3>
                    </div>
                );
        }
        
        var message = null;
        if (this.state.status === -1) {
            message = (
                <div>
                    <p>There is missing or incorrect information about the requested booking.</p>
                    <p>Please try searching for a sitter again.</p>
                </div>
            );
        } else if (this.state.status === 200) {
            message = (
                <div>
                    <p>A request for your pet-sitting appointment has been sent to <strong>{this.state.selectedUsername}</strong>.</p>
                    <p>You will receive a notification when they accept or decline your request.</p>
                </div>
            );
        } else if (this.state.status === 500) {
            message = (
                <div>
                    <p>A server error occurred.</p>
                    <p>Please try again later.</p>
                </div>
            );
        } else if (this.state.status !== 0) {
            message = (
                <div>
                    <p>An unknown error occurred. (Code: {this.state.status})</p>
                    <p>Please try again later.</p>
                </div>
            );
        }
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
            	<Grid>
                    <PageHeader>
                        Search Results
                    </PageHeader>
                    {results}
		        	<Modal show={this.state.status !== 0} onHide={this.close}>
    		            <Modal.Header closeButton>
    		                <Modal.Title>Request Sent!</Modal.Title>
    		            </Modal.Header>
    		            <Modal.Body>
    		                {message}
    		            </Modal.Body>
    		            <Modal.Footer>
    		              <Button onClick={() => this.close()} bsStyle="primary">Okay</Button>
    		            </Modal.Footer>
		            </Modal>
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

export default connect(mapStateToProps)(SearchResults);


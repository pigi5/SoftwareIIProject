import React from 'react';
import MyNavbar from 'js/navbar';
import { PageHeader, Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import { parseQuery } from 'js/util';
import { connect } from 'react-redux';


function mapTypeFromPets(curVal, index) {
    return curVal.type;
}

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        
        this.getSitters();
        
        this.state = {
            sitters: [],
            showModal: false,
            selectedUsername: ''
        };
    }
    
    getSitters() {
        // get search results from backend algorithm
        /*
        if (this.props.booking.hasOwnProperty('startDate') && this.props.booking.hasOwnProperty('endDate') && this.props.booking.hasOwnProperty('pets')) {
            axios.get('/api/login', {
                    params: {
                        startDate: this.props.booking.startDate,
                        endDate: this.props.booking.endDate,
                        zipCode: this.props.userData.zipCode,
                        petTypes: this.props.booking.pets.map(mapNamesToTypes)
                    }
                })
                .then((response) => {
    
                })
                .catch((error) => {
                    if (typeof error.response !== 'undefined') {
    
                        console.log(this.state.status);
                    }
                });
        }
        */
    }
    
    createSitterCard(curVal, index) {
        return (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <div className="sr-card">
                    <h3><strong>{curVal.name}</strong> <small>({curVal.username})</small></h3>
                    <p>Zip: {curVal.zipCode}</p>
                    <p>{curVal.rating} stars</p>
                    <div className="push-bottom">
                        <Button onClick={() => this.request(curVal.username)} bsStyle="success" block>Request</Button>
                    </div>
                </div>
            </Col>
        );
    }

    close() {
        this.setState({ showModal: false });
    }

    request(username) {
        this.setState({ showModal: true, selectedUsername: username });
        // logic to request appointment with sitter
        /*
        axios.get('/api/login', {
                params: {
                    ownerUsername: this.props.userData.username,
                    sitterUsername: username,
                    date: queryParams.date,
                    petNames: queryParams.pets
                }
            })
            .then((response) => {

            })
            .catch((error) => {
                if (typeof error.response !== 'undefined') {

                    console.log(this.state.status);
                }
            });
        */
    }
    
    render() {
        var results;
        if (this.state.sitters.length > 0) {
            results = (
                    <Grid>
                        <Row className="equal-height">
                            {this.state.sitters.map((curVal, index) => this.createSitterCard(curVal, index))}
                        </Row>
                    </Grid>
                );
        } else {
            results = (<h3>Sorry, there were no search results that match that query.</h3>);
        }
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
            	<div className="container">
                    <PageHeader>
                        Search Results
                    </PageHeader>
                    {results}
		        	<Modal show={this.state.showModal} onHide={this.close}>
    		            <Modal.Header closeButton>
    		                <Modal.Title>Request Sent!</Modal.Title>
    		            </Modal.Header>
    		            <Modal.Body>
    		                <p>A request for your pet-sitting appointment has been sent to <strong>{this.state.selectedUsername}</strong>.</p>
    		                <p>You will receive a notification when they accept or decline your request.</p>
    		            </Modal.Body>
    		            <Modal.Footer>
    		              <Button onClick={() => this.close()} bsStyle="primary">Okay</Button>
    		            </Modal.Footer>
		            </Modal>
				</div>
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


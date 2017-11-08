import React from 'react';
import { connect } from 'react-redux';
import MyNavbar from 'js/navbar';
import { PageHeader, Grid, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import { serializeQuery } from 'js/util';

const datePickerClear = (<i className="fa fa-times" aria-hidden="true"></i>);

function mapPetToPetForm(curVal, index) {
    var petCopy = JSON.parse(JSON.stringify(curVal));
    petCopy.checked = true;
    return petCopy;
}

function filterPetForms(curVal) {
    return curVal.checked;
}

function mapPetFormToPet(curVal, index) {
    var petCopy = JSON.parse(JSON.stringify(curVal));
    delete petCopy.checked;
    return petCopy;
}

class StartAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDateString: '',
            startDate: 0,
            startDateStatus: 0,
            endDateString: '',
            endDate: 0,
            endDateStatus: 0,
            pets: this.props.userData.pets.map(mapPetToPetForm),
            petsStatus: this.props.userData.pets.length > 0 ? 2 : 0,
            //location: 'My House'
         };
    }
    
    handleSubmit(event) {
        if (this.state.startDateStatus === 2 &&
                this.state.endDateStatus === 2 &&
                this.state.petsStatus === 2) {
            var bookingData = {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                pets: this.state.pets.filter(filterPetForms).map(mapPetFormToPet)
                //location: this.state.location
            };
            
            this.props.dispatch({
                type: 'START_BOOKING',
                bookingData: bookingData
            });
        }
            
        console.log(bookingData);
    }
    
    reset(event) {
        this.setState({
            startDateString: '',
            startDate: 0,
            startDateStatus: 0,
            endDateString: '',
            endDate: 0,
            endDateStatus: 0,
            pets: this.props.userData.pets.map(mapPetToPetForm),
            petsStatus: this.props.userData.pets.length > 0 ? 2 : 0,
            //location: 'My House'
        });
    }
    
    onStartChange(value, formattedValue) {
        var myDate = new Date(formattedValue + ' UTC');
        var curDate = new Date();
        var result = myDate.getTime();
        
        var status;
        if (value === '') {
            status = 0;
        } else if (result >= curDate.getTime()) {
            status = 2;
        } else {
            status = 1;
        }
        
        var endStatus = this.state.endDateStatus;
        if (this.state.endDateString === '') {
            endStatus = 0;
        } else if (this.state.endDate >= curDate.getTime() && this.state.endDate >= result) {
            endStatus = 2;
        } else {
            endStatus = 1;
        }
        
        this.setState({startDateString: value, startDate: result, startDateStatus: status, endDateStatus: endStatus});
    }
    
    onEndChange(value, formattedValue) {
        var myDate = new Date(formattedValue + ' UTC');
        var curDate = new Date();
        var result = myDate.getTime();
        var status;
        if (value === '') {
            status = 0;
        } else if (result >= curDate.getTime() && result >= this.state.startDate) {
            status = 2;
        } else {
            status = 1;
        }
        this.setState({endDateString: value, endDate: result, endDateStatus: status});
    }
    
    onPetChange(pet) {
        var petsCopy = JSON.parse(JSON.stringify(this.state.pets));
        var i;
        for (i = 0; i < petsCopy.length; i++) {
            if (petsCopy[i].name == pet.name && petsCopy[i].type == pet.type) {
                petsCopy[i].checked = !petsCopy[i].checked;
                break;
            }
        }
        var status = 0;
        for (i = 0; i < petsCopy.length; i++) {
            if (petsCopy[i].checked) {
                status = 2;
                break;
            }
        }
        this.setState({pets: petsCopy, petsStatus: status});
    }

//    onLocationChange(event) {
//        this.setState({location: event.target.value});
//    }

    createPetCheckbox(curVal, index) {
        return (
            <div className="checkbox" key={index}>
                <label>
                    <input type="checkbox" value="" checked={curVal.checked} onChange={(event) => this.onPetChange(curVal)} />
                    {curVal.name} <small>({curVal.type})</small>
                </label>
            </div>
        );
    }

    render() {
        var canSearch = (this.state.startDateStatus === 2 && this.state.endDateStatus === 2 && this.state.petsStatus === 2);
        return (
        	<div>
        	    <MyNavbar pageUrl={this.props.match.url} />
	        	<div className="container">
                    <PageHeader>
                        Search for a sitter
                    </PageHeader>
	        		<Grid>
		    			<Row className="top-buffer-sm">
		    			    <Col sm={4} smOffset={2} md={3} mdOffset={3}>
    			    			<legend>Pets</legend>
                            </Col>
                            <Col sm={4} md={3}>
                                {this.state.pets.map((curVal, index) => this.createPetCheckbox(curVal, index))}
                            </Col>
		    			</Row>
                        <Row className="top-buffer-sm">
                            <Col sm={4} smOffset={2} md={3} mdOffset={3}>
                                <legend>Start Date</legend>
                            </Col>
                            <Col sm={4} md={3}>
                                <DatePicker clearButtonElement={datePickerClear} value={this.state.startDateString} onChange={(value, formattedValue) => this.onStartChange(value, formattedValue)} />
                            </Col>
                        </Row>
                        <Row className="top-buffer-sm">
                            <Col sm={4} smOffset={2} md={3} mdOffset={3}>
                                <legend>End Date</legend>
                            </Col>
                            <Col sm={4} md={3}>
                                <DatePicker clearButtonElement={datePickerClear} value={this.state.endDateString} onChange={(value, formattedValue) => this.onEndChange(value, formattedValue)} />
                            </Col>
                        </Row>
                        <Row className="top-buffer-sm">
                            <Col sm={3} smOffset={3} md={2} mdOffset={4}>
                                <Button bsSize="lg" bsStyle="default" className="top-buffer-xs" onClick={(event) => this.reset(event)} block>Reset</Button>
                            </Col>
					    	<Col sm={3} md={2}>
					    		<Button bsSize="lg" bsStyle="primary" className="top-buffer-xs" onClick={(event) => this.handleSubmit(event)} href="/#/search" block disabled={!canSearch}>Search</Button>
					    	</Col>
	                    </Row>
				    </Grid>
			    </div>
		    </div>
        );
    }
}
/*
                        <Row className="top-buffer-sm">
                            <Col sm={4} smOffset={2} md={3} mdOffset={3}>
                                <legend>Location</legend>
                            </Col>
                            <Col sm={4} md={3}>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="locationRadios" value="My House" checked={this.state.location=='My House'} onChange={(event) => this.onLocationChange(event)} />
                                        My House
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="locationRadios" value="Sitter's House" checked={this.state.location=='Sitter\'s House'} onChange={(event) => this.onLocationChange(event)} />
                                        Sitter's House
                                    </label>
                                </div>
                            </Col>
                        </Row>
 */


const mapStateToProps = (store) => {
    return {
        authed: store.user.authed,
        userData: store.user.userData,
        booking: store.user.booking
    };
};

export default connect(mapStateToProps)(StartAppointment);

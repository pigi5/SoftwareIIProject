import React from 'react';
import { connect } from 'react-redux';
import MyNavbar from 'js/navbar';
import { PageHeader, Grid, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

const datePickerClear = (<i className="fa fa-times" aria-hidden="true"></i>);

export function mapPetToPetForm(curVal, index) {
    var petCopy = JSON.parse(JSON.stringify(curVal));
    petCopy.checked = true;
    return petCopy;
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
            startDateString: this.props.booking.hasOwnProperty('startDateString') ? this.props.booking.startDateString : '',
            startDate: this.props.booking.hasOwnProperty('startDate') ? this.props.booking.startDate : 0,
            startDateStatus: this.props.booking.hasOwnProperty('startDateStatus') ? this.props.booking.startDateStatus : 0,
            endDateString: this.props.booking.hasOwnProperty('endDateString') ? this.props.booking.endDateString : '',
            endDate: this.props.booking.hasOwnProperty('endDate') ? this.props.booking.endDate : 0,
            endDateStatus: this.props.booking.hasOwnProperty('endDateStatus') ? this.props.booking.endDateStatus : 0,
            petForms: this.props.booking.hasOwnProperty('petForms') ? this.props.booking.petForms : this.props.userData.pets.map(mapPetToPetForm),
            petsStatus: this.props.booking.hasOwnProperty('petsStatus') ? this.props.booking.petsStatus : (this.props.userData.pets.length > 0 ? 2 : 0)
         };
    }
    
    handleSubmit(event) {
        if (this.state.startDateStatus === 2 &&
                this.state.endDateStatus === 2 &&
                this.state.petsStatus === 2) {
            var bookingData = Object.assign({}, this.state, {pets: this.state.petForms.filter((curVal) => curVal.checked).map(mapPetFormToPet)});
            
            this.props.dispatch({
                type: 'UPDATE_BOOKING',
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
            petForms: this.props.userData.pets.map(mapPetToPetForm),
            petsStatus: this.props.userData.pets.length > 0 ? 2 : 0
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
        var petsCopy = JSON.parse(JSON.stringify(this.state.petForms));
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
        this.setState({petForms: petsCopy, petsStatus: status});
    }

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
                                {this.state.petForms.map((curVal, index) => this.createPetCheckbox(curVal, index))}
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


const mapStateToProps = (store) => {
    return {
        authed: store.user.authed,
        userData: store.user.userData,
        booking: store.user.booking
    };
};

export default connect(mapStateToProps)(StartAppointment);

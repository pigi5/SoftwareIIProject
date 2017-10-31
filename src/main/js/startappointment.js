import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';
import { AddPetModal, PetCheckList } from 'js/addpetmodal.js';
import { connect } from 'react-redux';
import MyNavbar from 'js/navbar';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

const datePickerClear = (<i className="fa fa-times" aria-hidden="true"></i>);

class StartAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        searchUrl: '/#/search?',
                        startDateString: '',
                        startDate: 0,
                        endDateString: '',
                        endDate: 0
                     };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleStartChange(value, formattedValue) {
        var myDate = new Date(formattedValue + ' UTC');
        var result = myDate.getTime();
        this.setState({startDate: myDate.getTime() / 1000});
    }
    
    handleEndChange(value, formattedValue) {
        var myDate = new Date(formattedValue + ' UTC');
        var result = myDate.getTime();
        this.setState({endDate: myDate.getTime() / 1000});
    }

    handleSubmit(event) {
    	// TODO
    	this.state = {
    			startDate: document.getElementById('inputStartDate').value,
    			endDate: document.getElementById('inputEndDate').value
    	};
    	
    	if (this.state.searchUrl != '/#/search?') this.state.searchUrl += '&';
    	this.state.searchUrl += 'date=' + this.state.startDate;
    	
    	window.location.href = this.state.searchUrl;
        
        event.preventDefault();
    }
    
    
    
    createPetCheckbox(curVal, index) {
        return (
            <div className="checkbox" key={index}>
                <label>
                    <input type="checkbox" value="" />
                    {curVal.name} <small>({curVal.type})</small>
                </label>
            </div>
        );
    }

    render() {
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
                                {this.props.userData.pets.map((curVal, index) => this.createPetCheckbox(curVal, index))}
                            </Col>
		    			</Row>
                        <Row className="top-buffer-sm">
                            <Col sm={4} smOffset={2} md={3} mdOffset={3}>
                                <legend>Location</legend>
                            </Col>
                            <Col sm={4} md={3}>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="locationRadios" id="locationRadiosMy" value="My House" defaultChecked />
                                        My House
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="locationRadios" id="locationRadiosSitter" value="Sitter\'s House" />
                                        Sitter's House
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        <Row className="top-buffer-sm">
                            <Col sm={4} smOffset={2} md={3} mdOffset={3}>
                                <legend>Start Date</legend>
                            </Col>
                            <Col sm={4} md={3}>
                                <DatePicker clearButtonElement={datePickerClear} value={this.state.startDateString} onChange={(value, formattedValue) => this.handleStartChange(value, formattedValue)} />
                            </Col>
                        </Row>
                        <Row className="top-buffer-sm">
                            <Col sm={4} smOffset={2} md={3} mdOffset={3}>
                                <legend>End Date</legend>
                            </Col>
                            <Col sm={4} md={3}>
                                <DatePicker clearButtonElement={datePickerClear} value={this.state.endDateString} onChange={(value, formattedValue) => this.handleEndChange(value, formattedValue)} />
                            </Col>
                        </Row>
						<div className="form-group row">
					    	<div className="col-sm-10">
					    		<button type="submit" className="btn btn-primary">Search</button>
					    	</div>
					    </div>

				    </Grid>
			    </div>
		    </div>
        );
    }
}

export class LocationRadios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        // I think this is right
        				myHouse: true,
                        sitterHouse: false
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
    	// TODO: set location
        
        event.preventDefault();
    }

    render() {
        return (
        	<form className="top-buffer-lg">
				<legend className="col-form-legend col-sm-2">Location</legend>
	  			<div className="form-check top-buffer-sm">
					<label className="form-check-label">
						<input className="form-check-input" type="radio" name="locationRadios" id="locationRadiosMy" value="myHouse" defaultChecked/>
						My house
					</label>
				</div>
				<div className="form-check">
					<label className="form-check-label">
						<input className="form-check-input" type="radio" name="locationRadios" id="locationRadiosSitter" value="sitterHouse"/>
						Sitter&#39;s house
					</label>
				</div>
        	</form>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        authed: store.user.authed,
        userData: store.user.userData
    };
};

export default connect(mapStateToProps)(StartAppointment);
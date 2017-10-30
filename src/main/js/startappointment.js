import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';
import { AddPetModal, PetCheckList } from 'js/addpetmodal.js';
import { connect } from 'react-redux';
import MyNavbar from 'js/navbar';

export class StartAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        searchUrl: '/#/search?',
                        startDate: '',
                        endDate: ''
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
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

    render() {
        return (
        	<div>
        	    <MyNavbar pageUrl={this.props.match.url} />
	            
	        	<div className="container left-align-300">
	        		<h2>Search for a sitter</h2>
	        		<div>
			    		<fieldset className="top-buffer-lg">
			    			<div className='row'>
				    			<legend className="col-form-legend col-sm-2">Pets</legend>
				    			<PetCheckList parent={this} />
			    			</div>
		                </fieldset>

			  			<fieldset>
			  				<LocationRadios />
			  			</fieldset>
			  			<fieldset className="top-buffer-lg">
			  				<div className='row'>
					  			<legend className="col-form-legend col-sm-2">Dates</legend>
				    			<div className="form-group">
				  		    		<label htmlFor="inputStartDate">Start date</label>
				  		    		<input type="date" className="form-control date-box-style" id="inputStartDate" placeholder="mm/dd/yyyy"/>
				  		    	</div>
				    			<div className="form-group">
						    		<label htmlFor="inputEndDate">End date</label>
						    		<input type="date" className="form-control date-box-style" id="inputEndDate" placeholder="mm/dd/yyyy"/>
						    	</div>
					    	</div>
				    	</fieldset>
						<div className="form-group row">
					    	<div className="col-sm-10">
					    		<button type="submit" className="btn btn-primary">Search</button>
					    	</div>
					    </div>

				    </div>
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
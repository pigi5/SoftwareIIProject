import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';
import { AddPetModal } from 'js/addpetmodal.js';
import { connect } from 'react-redux';
import MyNavbar from 'js/navbar';

export class StartAppointment extends React.Component {
    render() {
        return (
        	<div>
        	    <MyNavbar pageUrl={this.props.match.url} />
	            
	        	<div className="container left-align-300">
	        		<h2>Search for a sitter</h2>
	        		<div>
			    		<div className="top-buffer-sm">
		                    <AddPetModal />
		                </div>

			  			<div>
			  				<LocationRadios />
			  			</div>
		    			<div className="form-group">
		  		    		<label htmlFor="inputStartDate">Start date</label>
		  		    		<input type="date" className="form-control date-box-style" id="inputStartDate" placeholder="mm/dd/yyyy"/>
		  		    	</div>
		    			<div className="form-group">
				    		<label htmlFor="inputEndDate">End date</label>
				    		<input type="date" className="form-control date-box-style" id="inputEndDate" placeholder="mm/dd/yyyy"/>
				    	</div>
						<div className="form-group row">
					    	<div className="col-sm-10">
					    		<a href="/#/search" type="submit" className="btn btn-primary">Search</a>
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
        	<form>
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
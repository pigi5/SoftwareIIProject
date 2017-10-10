import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';
import { AddPetModal } from 'js/addpetmodal.js';
import { connect } from 'react-redux';

export class StartAppointment extends React.Component {
    render() {
        return (
        	<div>
	            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
	                <a className="navbar-brand" href="/#/">Tempeturs</a>
	                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	                    <span className="navbar-toggler-icon"></span>
	                </button>
	        
	                <div className="collapse navbar-collapse" id="navbarSupportedContent">
	                    <ul className="navbar-nav mr-auto">
	                        <li className="nav-item active">
	                            <a className="nav-link" href="/#/">Home</a>
	                        </li>
	                        <li className="nav-item">
	                            <a className="nav-link" href="/#/about">About</a>
	                        </li>
	                        <li className="nav-item">
	                            <a className="nav-link" href="/#/faq">FAQ</a>
	                        </li>
	                    </ul>
	                    <form className="form-inline my-2 my-lg-0">
	                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
	                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
	                    </form>
	                </div>
	            </nav>
	            
	        	<div className="container top-buffer-lg left-align-300">
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

export default connect()(LocationRadios);
import React from 'react';
//import { Link } from 'react-router-dom';
//import { GetterButton } from 'js/buttons.js';
//import { AddPetModal, PetCheckList } from 'js/addpetmodal.js';
//import { connect } from 'react-redux';
import MyNavbar from 'js/navbar';

export class StartAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	searchUrl: '',
        	startDate: '',
        	endDate: '',
        	pets: [
            	{
            		name: 'Fido',
            		type: 'dog',
            		checked: true
            	},
            	{
            		name: 'Fluffy',
            		type: 'cat',
            		checked: true
            	}
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.addVarToUrl = this.addVarToUrl.bind(this);
    }
    
    addVarToUrl(param) {
    	if (this.state.searchUrl != '') {
    		this.state = {
    			searchUrl: this.state.searchUrl + '&'
    		};
    	}
    	this.state = {
    		searchUrl: this.state.searchUrl + param
    	};
    	
    	return this.state.searchUrl;
    }

    createPetCheckbox(curVal, index, array) {
    	return (
			<div className="form-check" key={index}>
				<input className="form-check-input" type="checkbox" id={curVal.name} defaultChecked/> <label className="form-check-label" htmlFor={curVal.name}> {curVal.name}, {curVal.type}</label>
			</div>
    	);
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
    	
    	this.addVarToUrl('startDate=' + this.state.startDate);
    	this.addVarToUrl('endDate=' + this.state.endDate);
    	
    	for (var i = 0; i < this.state.pets.size; i++) {
        	if (this.state.pets[i].checked) {
	    		this.addVarToUrl('pets=' + this.state.pets[i].name);
        	}
        }
    	
    	this.state = {
    		searchUrl: '/#/search?' + encodeURI(this.state.searchUrl)
    	};
    	
    	console.log(this.state.searchUrl);
    	
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
								<div className="col-sm-10">
									{this.state.pets.map(this.createPetCheckbox)}
						    			
								</div>
			    			</div>
		                </fieldset>

			  			<fieldset className="top-buffer-lg">
			  				<LocationRadios />
			  			</fieldset>
			  			
			  			<fieldset className="top-buffer-lg">
			  				<div className='row'>
					  			<legend className="col-form-legend col-sm-2">Dates</legend>
					  			<div className="col-sm-10">
					    			<div className="form-group">
					  		    		<label htmlFor="inputStartDate">Start date</label>
					  		    		<input type="date" className="form-control date-box-style" id="inputStartDate" placeholder="mm/dd/yyyy"/>
					  		    	</div>
					    			<div className="form-group">
							    		<label htmlFor="inputEndDate">End date</label>
							    		<input type="date" className="form-control date-box-style" id="inputEndDate" placeholder="mm/dd/yyyy"/>
							    	</div>
						    	</div>
					    	</div>
				    	</fieldset>
						<div className="form-group row">
					    	<div className="col-sm-10">
					    		<button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Search</button>
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
        	<div className="row">
				<legend className="col-form-legend col-sm-2">Location</legend>
				<div className="col-sm-10">
		  			<div className="form-check">
						<input className="form-check-input" type="radio" name="locationRadios" id="locationRadiosMy" value="myHouse" defaultChecked/> <label className="form-check-label" htmlFor="locationRadiosMy">My house</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="radio" name="locationRadios" id="locationRadiosSitter" value="sitterHouse"/> <label className="form-check-label" htmlFor="locationRadiosSitter">Sitter&#39;s house</label>
					</div>
				</div>
        	</div>
        );
    }
}

/*
class PetCheckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: retrieve the user's pets from DB
			/*
			/api/users/getPets (?)
			for each pet, the checkbox should be checked
            */ /*
            pets: [
            	{
            		name: 'Fido',
            		type: 'dog',
            		checked: true
            	},
            	{
            		name: 'Fluffy',
            		type: 'cat',
            		checked: true
            	}
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
    	/* TODO: send checked pets into search function in order to restrict
    	 *       sitters to those that match the pet types
    	 */ /*
        for (var i = 0; i < this.state.pets.size; i++) {
        	if (this.state.parent.state.searchUrl != '/#/search?') this.state.parent.state.searchUrl += '&';
        	this.state.parent.state.searchUrl += 'pets=' + this.state.pets[i].name; 
        }
        event.preventDefault();
    }
    
    createPetCheckbox(curVal, index, array) {
    	return (
    			<div className="form-check" key={index}>
    				<input className="form-check-input" type="checkbox" id={curVal.name} defaultChecked/> <label className="form-check-label" htmlFor={curVal.name}> {curVal.name}, {curVal.type}</label>
				</div>
    	);
    }

    render() {
        return (
            <div>
	    		<fieldset className="form-group top-buffer-sm">
					<div className="row">
						<div className="col-sm-10">
							{this.state.pets.map(this.createPetCheckbox)}
			    			
						</div>
					</div>
				</fieldset>
            </div>
        );
    }
}
*/

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { StartAppointment } from 'js/startappointment.js';

export class AddPetModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        name: '',
                        type: ''
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        // add pet
    	// TODO: add pet name and type to list

		axios.post('/api/users/Addpets', {
			'name': this.state.name,
			'type': this.state.type
		})
			.then((response) => {
			this.setState({status: response.status});
		})
		.catch((error) => {
            console.log(JSON.stringify(error, null, 4));
			if (typeof error.response !== 'undefined') {
				this.setState({status: error.response.status});
			}
		});

        event.preventDefault();
    }

    render() {
        return (
            <div>
		    	<div className="col-sm-10">
		    		<button type="add" className="btn btn-primary" data-toggle="modal" data-target="#addPetModal">Add pet...</button>
		    	</div>
                <div>
                	<PetCheckList />
                </div>
        
				<div className="modal fade" id="addPetModal" tabIndex="-1" role="dialog" aria-labelledby="addPetModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="addPetModalLabel">Add pet</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
					    			<div className="form-group">
					    		    	<label htmlFor="inputPetName">Pet name</label>
					    		    	<input className="form-control" id="inputPetName" placeholder="Pet name"/>
					    			</div>
					    			<div className="form-group">
					    		    	<label htmlFor="selectPetType">Pet type</label>
					    		    	<select className="form-control" id="selectPetType">
					    		    		<option>bird</option>
					    		    		<option>cat</option>
					    		    		<option>dog</option>
					    		    		<option>ferret</option>
					    		    		<option>gerbil</option>
					    		    		<option>snake</option>
					    		    	</select>
					    			</div>
				    			</form>
					        </div>
							<div className="modal-footer">
					        	<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
					        	<button type="button" className="btn btn-primary">Save changes</button>
					        </div>
				      	</div>
				    </div>
				</div>

            </div>
        );
    }
}

export class PetCheckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: retrieve the user's pets from DB
			/*
			/api/users/getPets (?)
			for each pet, the checkbox should be checked
            */
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
    	 */
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
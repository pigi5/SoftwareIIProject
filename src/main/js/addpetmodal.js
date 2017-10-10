import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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
        
				<div className="modal fade" id="addPetModal" tabindex="-1" role="dialog" aria-labelledby="addPetModalLabel" aria-hidden="true">
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
					    		    	<label for="inputPetName">Pet name</label>
					    		    	<input className="form-control" id="inputPetName" placeholder="Pet name"/>
					    			</div>
					    			<div className="form-group">
					    		    	<label for="selectPetType">Pet type</label>
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

export default connect()(AddPetModal);

export class PetCheckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        // TODO: retrieve the user's pets from DB
        				/*
        				/api/users/getPets (?)
        				for each pet, the checkbox should be checked
                        */
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
        
        event.preventDefault();
    }

    render() {
        return (
            <div>
	    		<fieldset className="form-group top-buffer-sm">
					<div className="row">
						<div className="col-sm-10">
			    			<div className="form-check">
			    				<label className="form-check-label">
			    					<input className="form-check-input" type="checkbox" value="Fido"/>
			    					Fido, dog
			    				</label>
			    			</div>
			    			<div className="form-check">
								<label className="form-check-label">
									<input className="form-check-input" type="checkbox" value="Fluffy"/>
									Fluffy, cat
								</label>
							</div>
						</div>
					</div>
				</fieldset>
            </div>
        );
    }
}

//export default connect()(PetCheckList);
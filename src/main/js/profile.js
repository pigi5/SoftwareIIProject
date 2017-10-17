import React from 'react';
import axios from 'axios';
import Navbar from 'js/navbar';

export class Profile extends React.Component {
    render() { 
        return(
            <div>
                <Navbar pageName='Profile' />
                <div className='container padded'>
                    <p>This is your user profile.</p>
                    <div>
                		<div className="row">
                			<legend className="col-form-legend col-sm-2">Name</legend>
                			<div className="col-sm-10">
                				<p>Simon Sitter</p>
                				<EditNameModal />
                			</div>
                		</div>
                		<div className="row top-buffer-sm">
	            			<legend className="col-form-legend col-sm-2">Email</legend>
	            			<div className="col-sm-10">
	            				<p>simon.sitter@example.com</p>
	            				<button className="btn btn-primary" data-toggle="modal" data-target="">Edit...</button>
	            			</div>
	            		</div>
	            		<div className="row top-buffer-sm">
	            			<legend className="col-form-legend col-sm-2">Password</legend>
	            			<div className="col-sm-10">
	            				<button className="btn btn-primary" data-toggle="modal" data-target="">Change password...</button>
	            			</div>
	            		</div>
	            		<div className="row top-buffer-sm">
	            			<legend className="col-form-legend col-sm-2">Zip Code</legend>
	            			<div className="col-sm-10">
	            				<p>76798</p>
	            				<button className="btn btn-primary" data-toggle="modal" data-target="">Edit...</button>
	            			</div>
	            		</div>
	            		<div className="row top-buffer-sm">
	            			<legend className="col-form-legend col-sm-2">Pets</legend>
	            			<div className="col-sm-10">
	            				<p>Fido, dog</p>
	            				<p>Fluffy, cat</p>
	            				<button className="btn btn-primary" data-toggle="modal" data-target="">Add or remove...</button>
	            			</div>
	            		</div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

class EditNameModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        name: 'Simon Sitter',
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    changeName(obj) {
    	// TODO: Joseph - send the name change to DB
    	// Mostly copied from loginmodal.js
        this.props.dispatch({
            type: '', // not sure what this is supposed to be
            userData: obj
        });
        console.log('Name changed to:');
        console.log(JSON.stringify(obj, null, 4));

    }

	
    handleSubmit(event) {
        // Doesn't quite work yet
    	//*
    	axios.get('/api/users/WHATEVER_GOES_HERE', { // Is there an interface for this yet?
            params: {
                'name': this.state.name,
                }
            })
            .then((response) => {
                // Is this right?
                this.authorizeUser(response['data']);
            })
            .catch(function(error) {
                // TODO: Joseph - Notify the user that name edit failed
                console.log(error);
            });
		//*/
        
        event.preventDefault();
    }

    render() {
        return (
        		<div>
			    	<div className="col-sm-10">
			    		<button type="add" className="btn btn-primary" data-toggle="modal" data-target="#editNameModal">Edit...</button>
			    	</div>
	        
					<div className="modal fade" id="editNameModal" tabIndex="-1" role="dialog" aria-labelledby="editNameModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
                            	<form onSubmit={this.handleSubmit}>
		                            <div className="modal-header">
		                                <h5 className="modal-title" id="editNameModalLabel">Edit name</h5>
		                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		                                    <span aria-hidden="true">&times;</span>
		                                </button>
		                            </div>
		                            <div className="modal-body">
		                                <div className="input-group">
		                                    <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
		                                    <input className="form-control" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
		                                </div>
		                            </div>
		                            <div className="modal-footer">
		                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
		                                <button type="submit" className="btn btn-primary">Save</button>
		                            </div>
		                        </form>
					      	</div>
					    </div>
					</div>
	            </div>
        );
    }
}
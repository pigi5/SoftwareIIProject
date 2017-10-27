import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';

export class Profile extends React.Component {
    render() { 
        return(
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <p>This is your user profile.</p>
                    <div>
                		<div className="row">
                			<legend className="col-form-legend col-sm-2">Name</legend>
                			<div className="col-sm-10">
                				<EditNameModal />
                			</div>
                		</div>
                		<div className="row top-buffer-sm">
	            			<legend className="col-form-legend col-sm-2">Email</legend>
	            			<div className="col-sm-10">
	            				<EditEmailModal />
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
	            				<EditZipCodeModal />
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
			    		<p>{this.state.name}</p>
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
		                                <button type="submit" className="btn btn-primary" data-dismiss="modal">Save</button>
		                            </div>
		                        </form>
					      	</div>
					    </div>
					</div>
	            </div>
        );
    }
}

class EditEmailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        email: 'simon.sitter@example.com',
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    changeName(obj) {
    	// TODO: Joseph - send the email change to DB
    	// Mostly copied from loginmodal.js
        this.props.dispatch({
            type: '', // not sure what this is supposed to be
            userData: obj
        });
        console.log('Email changed to:');
        console.log(JSON.stringify(obj, null, 4));

    }

	
    handleSubmit(event) {
        // Doesn't quite work yet
    	//*
    	axios.get('/api/users/WHATEVER_GOES_HERE', { // Is there an interface for this yet?
            params: {
                'email': this.state.email,
                }
            })
            .then((response) => {
                // Is this right?
                this.authorizeUser(response['data']);
            })
            .catch(function(error) {
                // TODO: Joseph - Notify the user that email edit failed
                console.log(error);
            });
		//*/
        
        event.preventDefault();
    }

    render() {
        return (
        		<div>
			    	<div className="col-sm-10">
			    		<p>{this.state.email}</p>
			    		<button type="add" className="btn btn-primary" data-toggle="modal" data-target="#editEmailModal">Edit...</button>
			    	</div>
	        
					<div className="modal fade" id="editEmailModal" tabIndex="-1" role="dialog" aria-labelledby="editEmailModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
                            	<form onSubmit={this.handleSubmit}>
		                            <div className="modal-header">
		                                <h5 className="modal-title" id="editEmailModalLabel">Edit email</h5>
		                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		                                    <span aria-hidden="true">&times;</span>
		                                </button>
		                            </div>
		                            <div className="modal-body">
		                                <div className="input-group">
		                                    
		                                    <input className="form-control" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
		                                </div>
		                            </div>
		                            <div className="modal-footer">
		                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
		                                <button type="submit" className="btn btn-primary" data-dismiss="modal">Save</button>
		                            </div>
		                        </form>
					      	</div>
					    </div>
					</div>
	            </div>
        );
    }
}

class EditZipCodeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        zipCode: '76798',
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    changeName(obj) {
    	// TODO: Joseph - send the zipCode change to DB
    	// Mostly copied from loginmodal.js
        this.props.dispatch({
            type: '', // not sure what this is supposed to be
            userData: obj
        });
        console.log('Zip code changed to:');
        console.log(JSON.stringify(obj, null, 4));

    }

	
    handleSubmit(event) {
        // Doesn't quite work yet
    	//*
    	axios.get('/api/users/WHATEVER_GOES_HERE', { // Is there an interface for this yet?
            params: {
                'zipCode': this.state.zipCode,
                }
            })
            .then((response) => {
                // Is this right?
                this.authorizeUser(response['data']);
            })
            .catch(function(error) {
                // TODO: Joseph - Notify the user that email edit failed
                console.log(error);
            });
		//*/
        
        event.preventDefault();
    }

    render() {
        return (
        		<div>
			    	<div className="col-sm-10">
			    		<p>{this.state.zipCode}</p>
			    		<button type="add" className="btn btn-primary" data-toggle="modal" data-target="#editZipCodeModal">Edit...</button>
			    	</div>
	        
					<div className="modal fade" id="editZipCodeModal" tabIndex="-1" role="dialog" aria-labelledby="editZipCodeModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
                            	<form onSubmit={this.handleSubmit}>
		                            <div className="modal-header">
		                                <h5 className="modal-title" id="editZipCodeModalLabel">Edit zip code</h5>
		                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		                                    <span aria-hidden="true">&times;</span>
		                                </button>
		                            </div>
		                            <div className="modal-body">
		                                <div className="input-group">
		                                    <input className="form-control" name="zipCode" type="integer" value={this.state.zipCode} onChange={this.handleChange} />
		                                </div>
		                            </div>
		                            <div className="modal-footer">
		                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
		                                <button type="submit" className="btn btn-primary" data-dismiss="modal">Save</button>
		                            </div>
		                        </form>
					      	</div>
					    </div>
					</div>
	            </div>
        );
    }
}
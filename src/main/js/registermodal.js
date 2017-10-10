import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


export class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        email: '',
                        username: '',
                        password: '',
                        passwordRetype: '',
                        name: '',
                        zip: ''
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    userRegistered(obj) {
        this.props.dispatch({
            type: 'AUTH_USER',
            userData: obj
        });
        console.log('Registered and logged in as:');
        console.log(JSON.stringify(obj, null, 4));
    }
    
    handleSubmit(event) {
        // register

        // TODO: Austin - add the axios REST request to register a user
        //       (pass in email, username, password, name, zip)
        //       (receive user information if username is unique, else return http error code 401)
        //       I will test for unique usernames myself, but it would still be a good idea to 
        //       make sure you can't create a user with a duplicate username in the backend also
        // EX:


        axios.get('/api/users/register', {
                params: {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password,
                    name: this.state.name,
                    zip: this.state.zip
                }
            })
            .then((response) => {
                this.userRegistered(response['data']);
            })
            .catch(function(error) {
                // TODO: Ford - Notify the user that registration failed
                console.log(error);
            });

        
        event.preventDefault();
    }

    render() {
        var retypeIcon = 'fa fa-repeat fa-fw';
        if (this.state.passwordRetype) {
            if (this.state.password == this.state.passwordRetype) {
                retypeIcon = 'fa fa-check fa-fw text-success';
            } else {
                retypeIcon = 'fa fa-times fa-fw text-danger';
            }
        }
        
        return (
            <div>
                <button type="button" className="btn btn-success btn-block" data-toggle="modal" data-target="#registerModal">
                    <span>Register</span>
                    <i className="fa fa-user-plus pull-left" aria-hidden="true"></i>
                </button>
                
                <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="registerModalLabel">First Time Registration</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-envelope fa-fw" /></span>
                                        <input className="form-control" name="email" type="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-group top-buffer-sm">
                                        <span className="input-group-addon"><i className="fa fa-user fa-fw" /></span>
                                        <input className="form-control" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-group top-buffer-sm">
                                        <span className="input-group-addon"><i className="fa fa-key fa-fw" /></span>
                                        <input className="form-control" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-group top-buffer-sm">
                                        <span className="input-group-addon"><i className={retypeIcon} /></span>
                                        <input className="form-control" name="passwordRetype" type="password" placeholder="Retype Password" value={this.state.passwordRetype} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-group top-buffer-sm">
                                        <span className="input-group-addon"><i className="fa fa-user fa-fw" /></span>
                                        <input className="form-control" name="name" type="text" placeholder="Full Name" value={this.state.name} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-group top-buffer-sm">
                                        <span className="input-group-addon"><i className="fa fa-map-marker fa-fw" /></span>
                                        <input className="form-control" name="zip" type="number" placeholder="Zip Code" value={this.state.zip} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(RegisterModal);
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class LoginButton extends React.Component {
    render() {
        return (
            <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#loginModal">
                <span>Login</span>
                <i className="fa fa-sign-in fa-fw pull-left center-icon-vertical"  aria-hidden="true"></i>
            </button>
        );
    }
}

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        username: '',
                        password: '',
                        status: 0
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    authorizeUser(obj) {
        this.props.dispatch({
            type: 'AUTH_USER',
            userData: obj
        });
        console.log('Logged in as:');
        console.log(JSON.stringify(obj, null, 4));
    }
    
    handleSubmit(event) {
        // login
        axios.get('/api/login', {
                params: {
                    'username': this.state.username,
                    'password': this.state.password
                }
            })
            .then((response) => {
                console.log(JSON.stringify(response, null, 4));
                this.setState({status: response.status});
                this.authorizeUser(response.data);
            })
            .catch((error) => {
                console.log(JSON.stringify(error, null, 4));
                if (typeof error.response !== 'undefined') {
                    this.setState({status: error.response.status});
                    console.log(this.state.status);
                }
            });

        event.preventDefault();
    }

    render() {
        var errorMess = null;
        if (this.state.status == 401) {
            errorMess = (<p className='text-danger text-center top-buffer-sm'>Invalid username and/or password.</p>);
        } else if (this.state.status == 500) {
            errorMess = (<p className='text-danger text-center top-buffer-sm'>Server error. Please try again later.</p>);
        }

        return (
            <div>
                <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="loginModalLabel">Welcome Back!</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                                        <input className="form-control" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-group top-buffer-sm">
                                        <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                                        <input className="form-control" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                    {errorMess}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} data-dismiss="modal">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(LoginModal);
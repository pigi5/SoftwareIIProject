import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavItem, Modal, Button } from 'react-bootstrap';


function getIconFromState(state) {
    if (state === 1) {
        return <i className="fa fa-times fa-fw text-danger" />;
    } else if (state === 2) {
        return <i className="fa fa-check fa-fw text-success" />;
    }
    return <i className="fa fa-asterisk fa-fw text-danger" />;
}

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        username: '',
                        usernameInputState: 0,
                        password: '',
                        passwordInputState: 0,
                        passwordRetype: '',
                        retypeInputState: 0,
                        name: '',
                        nameInputState: 0,
                        email: '',
                        emailInputState: 0,
                        zip: '',
                        zipInputState: 0,
                        status: 0,
                        showModal: this.props.show
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    
    handleChange(event) {
        // handle input validation here
        if (event.target.name == 'username') {
            if (event.target.value === '') {
                this.setState({usernameInputState: 0});
            } else {
                axios.get('/api/users/exists', {
                        params: {
                            username: event.target.value
                        }
                    })
                    .then((response) => {
                        this.setState({usernameInputState: 1});
                    })
                    .catch((error) => {
                        this.setState({usernameInputState: 2});
                    });
            }
        } else if (event.target.name == 'password') {
            if (event.target.value === '') {
                this.setState({passwordInputState: 0});
            } else {
                this.setState({passwordInputState: 2});
            }
        } else if (event.target.name == 'passwordRetype') {
            if (event.target.value === '') {
                this.setState({retypeInputState: 0});
            } else if (event.target.value === this.state.password) {
                this.setState({retypeInputState: 2});
            } else {
                this.setState({retypeInputState: 1});
            }
        } else if (event.target.name == 'name') {
            if (event.target.value === '') {
                this.setState({nameInputState: 0});
            } else {
                this.setState({nameInputState: 2});
            }
        } else if (event.target.name == 'email') {
            if (event.target.value === '') {
                this.setState({emailInputState: 0});
            } else if (event.target.value.match(String.raw`^[a-zA-Z0-9.!#$%&’*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$`)) { //`
                this.setState({emailInputState: 2});
            } else {
                this.setState({emailInputState: 1});
            }
        } else if (event.target.name == 'zip') {
            if (event.target.value === '') {
                this.setState({zipInputState: 0});
            } else if (event.target.value.length === 5) {
                this.setState({zipInputState: 2});
            } else {
                this.setState({zipInputState: 1});
            }
        }
        
        // set state
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
        if (this.state.usernameInputState === 2 &&
                this.state.passwordInputState === 2 &&
                this.state.retypeInputState === 2 &&
                this.state.nameInputState === 2 &&
                this.state.emailInputState === 2 &&
                this.state.zipInputState === 2) {
            axios.put('/api/users/add', {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password,
                    name: this.state.name,
                    zipCode: this.state.zip
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
        } else {
            this.setState({status: -1});
        }
        
        event.preventDefault();
    }

    render() {
        var errorMess = null;
        if (this.state.status == 409) {
            errorMess = (<p className='text-danger text-center top-buffer-sm'>That username is already taken.</p>);
        } else if (this.state.status == 500) {
            errorMess = (<p className='text-danger text-center top-buffer-sm'>Server error. Please try again later.</p>);
        } else if (this.state.status == 200) {
            errorMess = (<p className='text-success text-center top-buffer-sm'>Registration successful.</p>);
        } else if (this.state.status == -1) {
            errorMess = (<p className='text-danger text-center top-buffer-sm'>You must complete all required fields.</p>);
        } else if (this.state.status != 0) {
            errorMess = (<p className='text-danger text-center top-buffer-sm'>An unknown error occurred.</p>);
        }
        
        var buttonEnabled = this.state.usernameInputState === 2 &&
                            this.state.passwordInputState === 2 &&
                            this.state.retypeInputState === 2 &&
                            this.state.nameInputState === 2 &&
                            this.state.emailInputState === 2 &&
                            this.state.zipInputState === 2;
        
        return (
            <NavItem onClick={this.open}>
                <span>Register</span>
                <i className="fa fa-user-plus pull-left center-icon-vertical" aria-hidden="true"></i>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>First Time Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="padded-modal">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user fa-fw" /></span>
                            <input className="form-control" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                            <span className="input-group-addon">{getIconFromState(this.state.usernameInputState)}</span>
                        </div>
                        <div className="input-group top-buffer-sm">
                            <span className="input-group-addon"><i className="fa fa-key fa-fw" /></span>
                            <input className="form-control" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                            <span className="input-group-addon">{getIconFromState(this.state.passwordInputState)}</span>
                        </div>
                        <div className="input-group top-buffer-sm">
                            <span className="input-group-addon"><i className="fa fa-repeat fa-fw" /></span>
                            <input className="form-control" name="passwordRetype" type="password" placeholder="Retype Password" value={this.state.passwordRetype} onChange={this.handleChange} />
                            <span className="input-group-addon">{getIconFromState(this.state.retypeInputState)}</span>
                        </div>
                        <div className="input-group top-buffer-sm">
                            <span className="input-group-addon"><i className="fa fa-user-o fa-fw" /></span>
                            <input className="form-control" name="name" type="text" placeholder="Full Name" value={this.state.name} onChange={this.handleChange} />
                            <span className="input-group-addon">{getIconFromState(this.state.nameInputState)}</span>
                        </div>
                        <div className="input-group top-buffer-sm">
                            <span className="input-group-addon"><i className="fa fa-envelope fa-fw" /></span>
                            <input className="form-control" name="email" type="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange} />
                            <span className="input-group-addon">{getIconFromState(this.state.emailInputState)}</span>
                        </div>
                        <div className="input-group top-buffer-sm">
                            <span className="input-group-addon"><i className="fa fa-map-marker fa-fw" /></span>
                            <input className="form-control" name="zip" type="number" placeholder="Zip Code" value={this.state.zip} onChange={this.handleChange} />
                            <span className="input-group-addon">{getIconFromState(this.state.zipInputState)}</span>
                        </div>
                        {errorMess}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button onClick={this.handleSubmit} bsStyle="primary" disabled={!buttonEnabled}>Register</Button>
                    </Modal.Footer>
                </Modal>
            </NavItem>
        );
    }
}

export default connect()(RegisterModal);
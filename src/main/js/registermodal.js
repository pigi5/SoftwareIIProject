import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavItem, Modal, Button } from 'react-bootstrap';

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        email: '',
                        username: '',
                        password: '',
                        passwordRetype: '',
                        name: '',
                        zip: '',
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

        axios.post('/api/users/add', {
                'id': '200',
                'email': this.state.email,
                'username': this.state.username,
                'password': this.state.password,
                'name': this.state.name,
                'zipCode': this.state.zip
            })
            .then((response) => {
                this.setState({status: response.status});
                //this.authorizeUser(response.data);
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
        var retypeIcon = 'fa fa-repeat fa-fw';
        if (this.state.passwordRetype) {
            if (this.state.password == this.state.passwordRetype) {
                retypeIcon = 'fa fa-check fa-fw text-success';
            } else {
                retypeIcon = 'fa fa-times fa-fw text-danger';
            }
        }
        
        var errorMess = null;
        if (this.state.status == 401) {
            errorMess = (<p className='text-danger text-center top-buffer-sm'>That username is already taken.</p>);
        } else if (this.state.status == 500) {
            errorMess = (<p className='text-danger text-center top-buffer-sm'>Server error. Please try again later.</p>);
        } else if (this.state.status == 200) {
            errorMess = (<p className='text-success text-center top-buffer-sm'>Registration successful.</p>);
        }
        
        return (
            <NavItem onClick={this.open}>
                <span>Register</span>
                <i className="fa fa-user-plus pull-left center-icon-vertical" aria-hidden="true"></i>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>First Time Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                        {errorMess}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button onClick={this.handleSubmit} bsStyle="primary">Register</Button>
                    </Modal.Footer>
                </Modal>
            </NavItem>
        );
    }
}

export default connect()(RegisterModal);
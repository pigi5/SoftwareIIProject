import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavItem, Modal, Button } from 'react-bootstrap';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        username: '',
                        password: '',
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
        axios.get('/api/users/authuser', {
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
        } else if (this.state.status == 200) {
            errorMess = (<p className='text-success text-center top-buffer-sm'>Login successful.</p>);
        }

        return (
            <NavItem onClick={this.open}>
                <span>Login</span>
                <i className="fa fa-sign-in fa-fw pull-left center-icon-vertical" aria-hidden="true"></i>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Welcome Back!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                            <input className="form-control" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                        </div>
                        <div className="input-group top-buffer-sm">
                            <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                            <input className="form-control" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        {errorMess}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button onClick={this.handleSubmit}>Login</Button>
                    </Modal.Footer>
                </Modal>
            </NavItem>
        );
    }
}

export default connect()(LoginModal);
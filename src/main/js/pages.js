import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';

export class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-2">
                        <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal">
                            <i className="fa fa-sign-in pull-left" aria-hidden="true"/>Login</button>
                        
                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Welcome Back!</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="input-group margin-bottom-sm">
                                            <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
                                            <input className="form-control" type="text" placeholder="Email address" />
                                        </div>
                                        <div className="input-group top-buffer">
                                            <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                                            <input className="form-control" type="password" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-2">
                        <a className="btn btn-success btn-block" href="#">
                            <i className="fa fa-user-plus pull-left" aria-hidden="true"/>Register</a>
                    </div>
                </div>
                <div className="row top-buffer">
                    <div className="col">
                        <a href="/#/owners" className="btn btn-info btn-block">Owners</a>
                    </div>
                    <div className="col">
                        <a href="/#/owners" className="btn btn-info btn-block">Sitters</a>
                    </div>
                    <div className="col">
                        <a href="/#/about" className="btn btn-info btn-block">About</a>
                    </div>
                    <div className="col">
                        <a href="/#/faq" className="btn btn-info btn-block">FAQ</a>
                    </div>
                </div>
                <div className="row top-buffer">
                    <GetterButton />
                </div>
            </div>
        );
    }
}

export class OwnersPage extends React.Component {
    render() {
        return (
            <div className="container padded">
                {'This is the owners page.'}
            </div>
        );
    }
}

export class SittersPage extends React.Component {
    render() {
        return (
            <div className="container padded">
                {'This is the sitters page.'}
            </div>
        );
    }
}

export class AboutPage extends React.Component {
    render() {
        return (
            <div className="container padded">
                {'This is the about page.'}
            </div>
        );
    }
}

export class FAQPage extends React.Component {
    render() {
        return (
            <div className="container padded">
                {'This is the FAQ page.'}
            </div>
        );
    }
}
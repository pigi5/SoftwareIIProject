import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';

export class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row top-buffer-sm">
                    <div className="col-2">
                        <div className="p-2 mb-2 bg-dark text-white text-center">
                            Tempeturs
                        </div>
                    </div>
                    <div className="col"></div>
                    <div className="col-2">
                        <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#loginModal">
                            <span>Login</span>
                            <i className="fa fa-sign-in fa-fw pull-left" aria-hidden="true"></i>
                        </button>
                        
                        <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="loginModalLabel">Welcome Back!</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                                            <input className="form-control" type="text" placeholder="Username" />
                                        </div>
                                        <div className="input-group top-buffer-sm">
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
                        <button type="button" className="btn btn-success btn-block" data-toggle="modal" data-target="#registerModal">
                            <span>Register</span>
                            <i className="fa fa-user-plus pull-left" aria-hidden="true"></i>
                        </button>
                        
                        <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="registerModalLabel">First Time Registration</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-envelope fa-fw"></i></span>
                                            <input className="form-control" type="email" placeholder="Email address" />
                                        </div>
                                        <div className="input-group top-buffer-sm">
                                            <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                                            <input className="form-control" type="text" placeholder="Username" />
                                        </div>
                                        <div className="input-group top-buffer-sm">
                                            <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                                            <input className="form-control" type="password" placeholder="Password" />
                                        </div>
                                        <div className="input-group top-buffer-sm">
                                            <span className="input-group-addon"><i className="fa fa-repeat fa-fw"></i></span>
                                            <input className="form-control" type="password" placeholder="Retype Password" />
                                        </div>
                                        <div className="input-group top-buffer-lg">
                                            <span className="input-group-addon"><i className="fa fa-map-marker fa-fw"></i></span>
                                            <input className="form-control" type="text" placeholder="Street Address" />
                                        </div>
                                        <div className="input-group top-buffer-sm">
                                            <span className="input-group-addon"><i className="fa fa-phone fa-fw"></i></span>
                                            <input className="form-control" type="tel" placeholder="Phone Number" />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-success">Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row top-buffer-sm">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="https://az616578.vo.msecnd.net/files/responsive/embedded/any/desktop/2016/10/10/636116545535774772-190236060_kittens.jpg" alt="First slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="http://1.bp.blogspot.com/-btvO5UMNMS0/Vphlz_Gq9XI/AAAAAAAACu0/1w27XjMQByg/s1600/pets%2B%25286%2529.jpg" alt="Second slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="http://cdn5.hawaiilife.com/2014/05/dogkisses2.jpg" alt="Third slide"/>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className="row top-buffer-sm">
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
                <div className="row top-buffer-sm">
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
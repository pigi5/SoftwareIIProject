import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterModal } from 'js/registermodal';
import { LoginModal } from 'js/loginmodal';
import { GetterButton } from 'js/buttons';

export class Home extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                    <a className="navbar-brand" href="/#/">Tempeturs</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
            
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/#/">Home<span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#/faq">FAQ</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <div className="container top-buffer-lg">
                    <div className="row top-buffer-sm">
                        <div className="col-2">
                            <div className="p-2 mb-2 bg-dark text-white text-center">
                                Tempeturs
                            </div>
                        </div>
                        <div className="col"></div>
                        <div className="col-2">
                            <LoginModal />
                        </div>
                        
                        <div className="col-2">
                            <RegisterModal />
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
                        <GetterButton />
                    </div>
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
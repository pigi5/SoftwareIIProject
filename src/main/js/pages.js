import React from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from 'js/registermodal';
import LoginModal from 'js/loginmodal';
import { GetterButton } from 'js/buttons';
import Navbar from 'js/navbar';

export class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar pageName='Home' />
                <div className="container">
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
                <div className="container top-buffer-sm">
                    <GetterButton />
                </div>
            </div>
        );
    }
}

export class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar pageName='About' />
                <div className='container padded'>
                    {'This is the about page.'}
                </div>
            </div>
        );
    }
}

export class FAQPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar pageName='FAQ' />
                <div className='container padded'>
                    {'This is the faq page.'}
                </div>
            </div>
        );
    }
}
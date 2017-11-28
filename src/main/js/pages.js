import React from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from 'js/registermodal';
import LoginModal from 'js/loginmodal';
import MyNavbar from 'js/navbar';
import { Carousel, PageHeader, Grid, Row, Col, Button } from 'react-bootstrap';

export class Home extends React.Component {
    render() {
        console.log(JSON.stringify(this.props, null, 4));
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className="container">
                    <Carousel>
	                    <Carousel.Item>
		                    <img alt="Tempeturs logo" src="https://i.imgur.com/bOcXNei.jpg" />
		                    <Carousel.Caption>
		                        <h3>Tempeturs logo</h3>
		                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
		                    </Carousel.Caption>
		                </Carousel.Item>
                        <Carousel.Item>
                            <img alt="First slide" src="https://az616578.vo.msecnd.net/files/responsive/embedded/any/desktop/2016/10/10/636116545535774772-190236060_kittens.jpg" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt="Second slide" src="http://1.bp.blogspot.com/-btvO5UMNMS0/Vphlz_Gq9XI/AAAAAAAACu0/1w27XjMQByg/s1600/pets%2B%25286%2529.jpg" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt="Third slide" src="http://cdn5.hawaiilife.com/2014/05/dogkisses2.jpg" />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        );
    }
}

export class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <PageHeader>
                        About
                    </PageHeader>
                </div>
            </div>
        );
    }
}

export class FAQPage extends React.Component {
    render() {
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <PageHeader>
                        FAQ
                    </PageHeader>
                </div>
            </div>
        );
    }
}

export class NotFoundPage extends React.Component {
    render() {
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <PageHeader>
                        Error 404
                    </PageHeader>
                    <p>That page could not be found.</p>
                </div>
            </div>
        );
    }
}
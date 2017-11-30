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
                            <img alt="Tempeturs" src="https://az616578.vo.msecnd.net/files/responsive/embedded/any/desktop/2016/10/10/636116545535774772-190236060_kittens.jpg" />
                            <Carousel.Caption>
                                <h1>Tempeturs</h1>
                                <h3>- Pet-Sitting Services -</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt="Need a sitter?" src="http://262f1527b4cc0b7ecec8-8c0e83a13bc8c5abf51c3c0744ac5234.r72.cf1.rackcdn.com/lps/assets/u/dog-cavalier-king-charles-spaniel-funny-pet-162167.jpeg" />
                            <Carousel.Caption>
                                <h2>Need a sitter?</h2>
                                <h4>Sign up to find an available pet sitter near you.</h4>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt="Want to be a sitter?" src="http://1.bp.blogspot.com/-btvO5UMNMS0/Vphlz_Gq9XI/AAAAAAAACu0/1w27XjMQByg/s1600/pets%2B%25286%2529.jpg" />
                            <Carousel.Caption>
                                <h2>Want to be a sitter?</h2>
                                <h4>Sign up so that owners can request your pet-sitting services.</h4>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        );
    }
}

export class HelpPage extends React.Component {
    render() {
        return (
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <PageHeader>
                        Help
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
import React from 'react';

export class Navbar extends React.Component {
    constructor(props) {
        super();
        this.state = {
            pages: [
                {
                    name: 'Home',
                    link: '/#/'
                },
                {
                    name: 'About',
                    link: '/#/about'
                },
                {
                    name: 'FAQ',
                    link: '/#/faq'
                },
                {
                    name: 'Start Appointment',
                    link: '/#/startappt'
                },
                {
                    name: 'Sitter Prefs',
                    link: '/#/sitterprefs'
                }
            ]
        };
    }
    
    render() {        
        var createNavLink = function(curVal, index, array) {
            if (curVal.name == this.props.pageName) {
                return (<li key={index} className="nav-item active"><a className="nav-link" href={curVal.link}>{curVal.name}<span className="sr-only">(current)</span></a></li>);
            } else {
                return (<li key={index} className="nav-item"><a className="nav-link" href={curVal.link}>{curVal.name}</a></li>);
            }
        }.bind(this);
        
        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                    <a className="navbar-brand" href="/#/">Tempeturs</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
            
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {this.state.pages.map(createNavLink)}
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <div className="container top-buffer-lg" />
            </div>
        );
    }
}
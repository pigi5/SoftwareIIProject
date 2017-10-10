import React from 'react';
import { RegisterButton, RegisterModal } from 'js/registermodal';
import { LoginButton, LoginModal } from 'js/loginmodal';
import { connect } from 'react-redux';

export class Navbar extends React.Component {
    constructor() {
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
        
        var navButtons;
        console.log('auth check: ' + JSON.stringify(this.props));
        if (this.props.authed) {
            console.log('authed');
            navButtons = (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        Logged In
                    </li>
                </ul>
            );
        } else {
            console.log('not authed');
            navButtons = (
                <ul className="nav navbar-nav navbar-right">
                    <li className="right-buffer-sm">
                        <LoginButton />
                    </li>
                    <li>
                        <RegisterButton />
                    </li>
                </ul>
            );
        }
        
        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                    <a className="navbar-brand" href="/#/">Tempeturs</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
            
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {this.state.pages.map(createNavLink)}
                        </ul>
                        {navButtons}
                    </div>
                </nav>
                <div className="top-buffer-lg" />
                <LoginModal />
                <RegisterModal />
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        authed: store.user.authed
    };
};

export default connect(mapStateToProps)(Navbar);

import React from 'react';
import RegisterModal, { RegisterButton } from 'js/registermodal';
import LoginModal, { LoginButton } from 'js/loginmodal';
import { connect } from 'react-redux';

class Navbar extends React.Component {
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
                }
            ]
        };
        
        this.createNavLink = this.createNavLink.bind(this);
    }
    
    logout() {
        this.props.dispatch({type:'UNAUTH_USER'});
        this.forceUpdate();
    }
    
    createNavLink(curVal, index, array) {
        if (curVal.name == this.props.pageName) {
            return (<li key={index} className="nav-item active"><a className="nav-link" href={curVal.link}>{curVal.name}<span className="sr-only">(current)</span></a></li>);
        } else {
            return (<li key={index} className="nav-item"><a className="nav-link" href={curVal.link}>{curVal.name}</a></li>);
        }
    }
    
    getNavButtons() {
        if (this.props.authed) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item dropdown right-buffer-sm">
                        <a className="nav-link dropdown-toggle" href="#" id="profileDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>{this.props.userData.username}</span>
                            <i className="fa fa-user-circle-o fa-fw pull-left center-icon-vertical" aria-hidden="true"></i>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="profileDropdownMenuLink">
                            <a className="dropdown-item" href="/#/profile">Profile</a>
                            <a className="dropdown-item" href="/#/startappt">Start Appointment</a>
                            <a className="dropdown-item" href="/#/sitterprefs">Sitter Prefs</a>
                        </div>
                    </li>
                    <li>
                        <button className='btn btn-primary btn-block' onClick={() => this.logout()}>
                            <span>Logout</span>
                            <i className="fa fa-sign-out fa-fw pull-left center-icon-vertical" aria-hidden="true"></i>
                        </button>
                    </li>
                </ul>
            );
        } else {
            return (
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
    }
    
    render() {        
        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                    <a className="navbar-brand" href="/#/">Tempeturs</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
            
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {this.state.pages.map(this.createNavLink)}
                        </ul>
                        {this.getNavButtons()}
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
        authed: store.user.authed,
        userData: store.user.userData
    };
};

export default connect(mapStateToProps)(Navbar);

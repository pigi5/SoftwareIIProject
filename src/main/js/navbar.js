import React from 'react';
import RegisterModal, { RegisterButton } from 'js/registermodal';
import LoginModal from 'js/loginmodal';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class MyNavbar extends React.Component {
    constructor(props) {
        super(props);
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
        
        console.log(JSON.stringify(this.props, null, 4));
        
        this.createNavLink = this.createNavLink.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.dispatch({type:'UNAUTH_USER'});
        this.forceUpdate();
    }
    
    createNavLink(curVal, index, array) {
        return (<NavItem eventKey={index} key={index} href={curVal.link}>{curVal.name}</NavItem>);
    }
    
    getNavButtons() {
        if (this.props.authed) {
            return (
                <Nav pullRight activeHref={'/#' + this.props.pageUrl}>
                    <NavItem href="/#/dashboard/sitter">Sitter Dashboard<i className="fa fa-id-card-o fa-fw pull-left center-icon-vertical" aria-hidden="true"></i></NavItem>
                    <NavItem href="/#/dashboard/owner">Owner Dashboard<i className="fa fa-paw pull-left center-icon-vertical" aria-hidden="true"></i></NavItem>
                    <NavDropdown title={this.props.userData.username} id="basic-nav-dropdown">
                        <MenuItem href="/#/profile">Profile</MenuItem>
                        <MenuItem href="/#/startappt">Start Appointment</MenuItem>
                        <MenuItem href="/#/sitterprefs">Sitter Prefs</MenuItem>
                    </NavDropdown>
                    <NavItem onClick={this.logout}>Logout<i className="fa fa-sign-out pull-left center-icon-vertical" aria-hidden="true"></i></NavItem>
                </Nav>
            );
        } else {
            return (
                <Nav pullRight>
                    <LoginModal show={this.props.pageUrl === '/login'} />
                    <RegisterModal show={this.props.pageUrl === '/register'} />
                </Nav>
            );
        }
    }
    
    render() {        
        return (
            <div>
                <Navbar fluid fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/#/">Tempeturs</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeHref={'/#' + this.props.pageUrl}>
                            {this.state.pages.map(this.createNavLink)}
                        </Nav>
                        {this.getNavButtons()}
                    </Navbar.Collapse>
                </Navbar>
                <div className="top-buffer-lg" />
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

export default connect(mapStateToProps)(MyNavbar);

import React from 'react';
import RegisterModal, { RegisterButton } from 'js/registermodal';
import LoginModal from 'js/loginmodal';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Badge } from 'react-bootstrap';

class MyNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {
                    icon: 'question-circle',
                    name: 'Help',
                    link: '/#/help'
                }
            ]
        };
    }

    logout() {
        this.props.dispatch({type:'UNAUTH_USER'});
        this.forceUpdate();
    }
    
    createNavLink(curVal, index) {
        var icon = null;
        if (curVal.icon) {
            icon = (<i className={'fa fa-' + curVal.icon + ' fa-fw pull-left center-icon-vertical'} aria-hidden="true" />);
        }
        return (
                <NavItem eventKey={index} key={index} href={curVal.link}>
                    <span>{curVal.name}</span>
                    {icon}
                </NavItem>
            );
    }
    
    getNavButtons() {
        if (this.props.authed) {
            var ownerBadge = null;
            var sitterBadge = null;
            var numNewOwnerNots = this.props.userData.ownerNotifications.filter(notification => !notification.isRead).length;
            if (numNewOwnerNots) {
                ownerBadge = (<Badge className="navbadge" pullRight>{numNewOwnerNots}</Badge>);
            }
            var numNewSitterNots = this.props.userData.sitterNotifications.filter(notification => !notification.isRead).length;
            if (numNewSitterNots) {
                sitterBadge = (<Badge className="navbadge" pullRight>{numNewSitterNots}</Badge>);
            }
            
            return (
                <Nav pullRight activeHref={'/#' + this.props.pageUrl}>
                    <NavItem href="/#/dashboard/sitter" className="bg-success">
                        <span>Sitter Dashboard</span>
                        <i className="fa fa-id-card-o fa-fw pull-left center-icon-vertical" aria-hidden="true" />
                        {sitterBadge}
                    </NavItem>
                    <NavItem href="/#/dashboard/owner" className="bg-info">
                        <span>Owner Dashboard</span>
                        <i className="fa fa-paw fa-fw pull-left center-icon-vertical" aria-hidden="true" />
                        {ownerBadge}
                    </NavItem>
                    <NavItem href="/#/profile">
                        <span>{this.props.userData.username}<i className="fa fa-user fa-fw pull-left center-icon-vertical" aria-hidden="true" /></span>
                    </NavItem>
                    <NavItem href="/logout" onClick={(event) => this.logout(event)} className="bg-primary">
                        <span className="text-white">Logout<i className="fa fa-sign-out fa-fw pull-left center-icon-vertical" aria-hidden="true" /></span>
                    </NavItem>
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
                            <img src="https://i.imgur.com/qRzzKot.png" className="pull-left navbar-img"/>
                            <a href="/#/" className="text-dark">Tempeturs</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeHref={'/#' + this.props.pageUrl}>
                            {this.state.pages.map((curVal, index) => this.createNavLink(curVal, index))}
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

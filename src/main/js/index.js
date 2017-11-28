import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { Home, SittersPage, OwnersPage, AboutPage, FAQPage, NotFoundPage } from 'js/pages';
import SearchResults from 'js/searchresults';
import StartAppointment from 'js/startappointment';
import OwnerDashboard from 'js/ownerdashboard';
import SitterDashboard from 'js/sitterdashboard';
import Profile from 'js/profile';

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
            }
        />
    );
}

class Index extends React.Component {
	render() {
		return (
			<Router>
			    <Switch>
        			<Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Home} />
                    <Route exact path="/register" component={Home} />
                    <Route exact path="/about" component={AboutPage} />
                    <Route exact path="/faq" component={FAQPage} />
                   
                    <PrivateRoute exact path="/dashboard/owner" authed={this.props.authed} component={OwnerDashboard} />
                    <PrivateRoute exact path="/dashboard/sitter" authed={this.props.authed} component={SitterDashboard} />
                    <PrivateRoute exact path="/profile" authed={this.props.authed} component={Profile} />
                    <PrivateRoute exact path="/search" authed={this.props.authed} component={SearchResults} />
                    <PrivateRoute exact path="/startappt" authed={this.props.authed} component={StartAppointment} />
              
                    <Route component={NotFoundPage} />
                </Switch>
    		</Router>
		);
	}
}
const mapStateToProps = (store) => {
    return {
        authed: store.user.authed
    };
};

export default connect(mapStateToProps)(Index);
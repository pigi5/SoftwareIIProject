import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Home, SittersPage, OwnersPage, AboutPage, FAQPage } from 'js/pages';
import {SearchResults} from 'js/searchresults';
import {SitterPreferences} from 'js/sitterpreferences';
import {StartAppointment} from 'js/startappointment';
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
			    <div>
        			<Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Home} />
                    <Route exact path="/register" component={Home} />
                    <Route exact path="/about" component={AboutPage} />
                    <Route exact path="/faq" component={FAQPage} />
        
                    <Route exact path="/search" component={SearchResults} />
                    <Route exact path="/sitterprefs" component={SitterPreferences} />
                    <Route exact path="/startappt" component={StartAppointment} />
                   
                    <PrivateRoute exact path="/dashboard/owner" authed={this.props.authed} component={OwnerDashboard} />
                    <PrivateRoute exact path="/dashboard/sitter" authed={this.props.authed} component={SitterDashboard} />
                    <PrivateRoute exact path="/profile" authed={this.props.authed} component={Profile} />
                </div>
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
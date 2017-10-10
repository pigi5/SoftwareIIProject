import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Home, SittersPage, OwnersPage, AboutPage, FAQPage } from 'js/pages';
import {SearchResults} from 'js/searchresults';
import {SitterPreferences} from 'js/sitterpreferences';
import {StartAppointment} from 'js/startappointment';

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
        />
    );
}

export class Index extends React.Component {    
	render() {
		return (
			<HashRouter>
			    <div>
        			<Route exact path="/" component={Home} />
                    <Route exact path="/about" component={AboutPage} />
                    <Route exact path="/faq" component={FAQPage} />
        
                    <Route exact path="/search" component={SearchResults} />
                    <Route exact path="/sitterprefs" component={SitterPreferences} />
                    <Route exact path="/startappt" component={StartAppointment} />
                </div>
    		</HashRouter>
		);
	}
}
const mapStateToProps = (store) => {
    return {
        authed: store.user.authed
    };
};

export default connect(mapStateToProps)(Index);
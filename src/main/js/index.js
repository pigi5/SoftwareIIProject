import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { Home, SittersPage, OwnersPage, AboutPage, FAQPage } from 'js/pages';
import {SearchResults} from 'js/searchresults';
import {SitterPreferences} from 'js/sitterpreferences';
import {StartAppointment} from 'js/startappointment';



export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Home} />
					<Route exact path="/sitters" component={SittersPage} />
					<Route exact path="/owners" component={OwnersPage} />
					<Route exact path="/about" component={AboutPage} />
                    <Route exact path="/faq" component={FAQPage} />
					<Route exact path="/search" component={SearchResults}/>
					<Route exact path="/sitterprefs" component={SitterPreferences}/>
					<Route exact path="/startappt" component={StartAppointment}/>
				</div>
			</HashRouter>
		);
	}
}
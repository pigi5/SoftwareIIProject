import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { Home, Page1, Page2, Page3 } from 'js/pages';

export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Home} />
					<Route exact path="/sitters" component={Page1} />
					<Route exact path="/owners" component={Page2} />
					<Route exact path="/help" component={Page3} />
				</div>
			</HashRouter>
		);
	}
}
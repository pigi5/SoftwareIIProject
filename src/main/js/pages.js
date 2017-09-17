import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
	render() {
		return (
			<div className="container padded">
				Tempteturs HOME PAGE.

				<ul>
					<li><Link to="/sitters">Sitters Page</Link></li>
					<li><Link to="/owners">Owners Page</Link></li>
					<li><Link to="/help">Help!</Link></li>
				</ul>
			</div>
		);
	}
}

export class Page1 extends React.Component {
	render() {
		return (
			<div className="container padded">
				This is the sitter's page.
			</div>
		);
	}
}

export class Page2 extends React.Component {
	render() {
		return (
			<div className="container padded">
				This is the owners page.
			</div>
		);
	}
}

export class Page3 extends React.Component {
	render() {
		return (
			<div className="container padded">
				This is the help page.
			</div>
		);
	}
}
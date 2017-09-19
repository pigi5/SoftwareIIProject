import React from 'react';
import { Link } from 'react-router-dom';
import GetterButton from 'js/buttons.js';


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
				{'This is the sitters page.'}
			</div>
		);
	}
}

export class Page2 extends React.Component {
	constructor() {
		super();
		this.state = {
			text: 'Nothing',
			ul: <div>{'Nothing'}</div>
		};
	}
	
	textCallback(text) {
		var obj = JSON.parse(text);
		this.setState({ul: (
			<ul>
				<li>{'Owner Info'}
					<ul>
						<li>{'Name: ' + obj.user.name}</li>
						<li>{'Email: ' + obj.user.email}</li>
						<li>{'Pets: ' + obj.pets.length}</li>
					</ul>
				</li>
			</ul>
		)});
	}
	
	handleClick() {
		var r = Math.floor(Math.random() * 5 + 1);
		
		var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() { 
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	        	this.textCallback(xmlHttp.responseText);
	        }
	    }.bind(this);
	    xmlHttp.open('GET', 'http://localhost:8080/api/owner/' + r, true);
	    xmlHttp.send(null);
	}
	
	render() {
		return (
			<div className="container padded">
				<button class="button" onClick={() => this.handleClick()}>
					{'Get a random Owner'}
				</button>
				<div>
					{this.state.ul}
				</div>
			</div>
		);
	}
}

export class Page3 extends React.Component {
	render() {
		return (
			<div className="container padded">
				{'This is the help page.'}
			</div>
		);
	}
}
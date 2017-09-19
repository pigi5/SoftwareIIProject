import React from 'react';

class GetterButton extends React.Component {
	constructor() {
		super();
		this.state = {
			text: 'Nothing',
		};
	}
	
	textCallback(text) {
		this.state.text = text;
	}
	
	handleClick() {
		var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() { 
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	            this.textCallback(xmlHttp.responseText);
	    };
	    xmlHttp.open('GET', 'http://localhost:8080/api/owner/1', true);
	    xmlHttp.send(null);
	}

	render() {
		return (
			<button class="button" onClick={() => this.handleClick()}>
				{'Get Random Sitter'}
			</button>
		);
	}
}
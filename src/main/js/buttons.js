import React from 'react';

export class GetterButton extends React.Component {
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
	    xmlHttp.open('GET', '/api/owner/' + r, true);
	    xmlHttp.send(null);
	}
	
    render() { 
        return(
        	<div>
				<button className='button' onClick={() => this.handleClick()}>
					{'Get a random Owner'}
				</button>
				<div>
					{this.state.ul}
				</div>
	            <div>
	            	{this.props.children}
	            </div>
        	</div>
        );
    }
}
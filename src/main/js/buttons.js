import React from 'react';
import axios from 'axios';

export class GetterButton extends React.Component {
	constructor() {
		super();
		this.state = {
			text: 'Nothing',
			ul: <div>{'Nothing'}</div>
		};
	}
	
	textCallback(obj) {

		this.setState({ul: (
			<ul>
				<li>{'Owner Info'}
					<ul>
						<li>{'Name: ' + obj.name}</li>
						<li>{'Email: ' + obj.email}</li>
						<li>{'Pets: ' + obj.length}</li>
					</ul>
				</li>
			</ul>
		)});
	}

	addOwnerToDb(obj){
        axios.put('/api/users/add', obj)
			.catch(function(error){
			console.log(error);
		});
	}
	
	handleClick() {
		var r = Math.floor(Math.random() * 5 + 1);

	    axios.get('/api/users/' + r)
	         .then((response) => {
	             this.textCallback(response['data']);
	             this.addOwnerToDb(response['data']);
	         })
	         .catch(function(error) {
	             console.log(error);
	         });
	         
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
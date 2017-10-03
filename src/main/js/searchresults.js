import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';

/*
const cardStyle = {
		width: '20rem'
};
*/

export class SearchResults extends React.Component {
    render() {
        return (
			<div className="container">
	        	<div className="card" style={{width: '20rem'}}>
					// <img className="card-img-top" src="..." alt="Card image cap"/>
					<div className="card-body">
						<h4 className="card-title">Susie Sitter</h4>
						<p className="card-text">Zip: 76798</p>
						<a href="#" className="card-link">4.4 stars</a>
						<a href="#" className="btn btn-primary">Request</a>
					</div>
				</div>
				<div className="card" style={{width: '20rem'}}>
					// <img className="card-img-top" src="..." alt="Card image cap"/>
					<div className="card-body">
						<h4 className="card-title">Simon Sitter</h4>
						<p className="card-text">Zip: 76800</p>
						<a href="#" className="card-link">4.2 stars</a>
						<a href="#" className="btn btn-primary">Request</a>
					</div>
				</div>
			</div>
		);
    }
}


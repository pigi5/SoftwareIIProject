import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';
import Navbar from 'js/navbar';

export class SearchResults extends React.Component {
    render() {
        return (
            <div>
				<Navbar pageName="Search" />
            	<div className="container top-buffer-lg">
		        	<div className="card horizontally-centered" style={{width: '20rem'}}>
						<img className="card-img-top" src="http://maxpixel.freegreatpicture.com/static/photo/1x/Dog-Pet-Woman-Doberman-Pinscher-Hobby-Portrait-888400.jpg" alt="Card image cap"/>
						<div className="card-body">
							<h4 className="card-title">Susie Sitter</h4>
							<p className="card-text">Zip: 76798</p>
							<p className="card-text">4.4 stars</p>
							<a href="#" className="btn btn-primary" data-toggle="modal" data-target="#sitterRequestedModal">Request</a>
						</div>
					</div>
					<div className="card horizontally-centered" style={{width: '20rem'}}>
						<img className="card-img-top" src="https://c.pxhere.com/photos/77/9b/maine_coon_cat_man_pet_longhair_cat_cool_maine_coon_cat_adidas-845518.jpg!d" alt="Card image cap"/>
						<div className="card-body">
							<h4 className="card-title">Simon Sitter</h4>
							<p className="card-text">Zip: 76800</p>
							<p className="card-text">4.2 stars</p>
							<a href="#" className="btn btn-primary" data-toggle="modal" data-target="#sitterRequestedModal">Request</a>
						</div>
					</div>
					
					<div className="modal fade" id="sitterRequestedModal" tabIndex="-1" role="dialog" aria-labelledby="sitterRequestedModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="sitterRequestedModalLabel">Sitter requested</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									A request has been sent to the sitter you selected. The sitter may accept or decline your request.
								</div>
								<div className="modal-footer">
						        	<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
						        </div>
					      	</div>
					    </div>
					</div>
				</div>
			</div>
		);
    }
}


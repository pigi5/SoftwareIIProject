import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';
import Navbar from 'js/navbar';

export class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitters: 
                [
                    {
                        name: 'Susie Sitter',
                        zip: 76798,
                        rating: 4.4,
                        pic: 'http://maxpixel.freegreatpicture.com/static/photo/1x/Dog-Pet-Woman-Doberman-Pinscher-Hobby-Portrait-888400.jpg'
                    },
                    {
                        name: 'Simon Sitter',
                        zip: 76800,
                        rating: 4.2,
                        pic: 'https://c.pxhere.com/photos/77/9b/maine_coon_cat_man_pet_longhair_cat_cool_maine_coon_cat_adidas-845518.jpg!d'
                    }
                ]
        }
    }
    
    createSitterCard(curVal, index, array) {
        return (
                <div className="card horizontally-centered" key={index} style={{width: '20rem'}}>
                    <img className="card-img-top" src={curVal.pic} alt="Card image cap" />
                    <div className="card-body">
                        <h4 className="card-title">{curVal.name}</h4>
                        <p className="card-text">Zip: {curVal.zip}</p>
                        <p className="card-text">{curVal.rating} stars</p>
                        <a href="#" className="btn btn-primary" data-toggle="modal" data-target="#sitterRequestedModal">Request</a>
                    </div>
                </div>
        );
    }
    
    render() {
        return (
            <div>
				<Navbar pageName="Search" />
            	<div className="container top-buffer-lg">
		        	{this.state.sitter.map(this.createSitterCard)}
					
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


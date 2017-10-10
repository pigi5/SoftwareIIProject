import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';
import { AddPetModal } from 'js/addpetmodal.js';

export class StartAppointment extends React.Component {
    render() {
        return (
        	<div>
	            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
	                <a className="navbar-brand" href="/#/">Tempeturs</a>
	                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	                    <span className="navbar-toggler-icon"></span>
	                </button>
	        
	                <div className="collapse navbar-collapse" id="navbarSupportedContent">
	                    <ul className="navbar-nav mr-auto">
	                        <li className="nav-item active">
	                            <a className="nav-link" href="/#/">Home</a>
	                        </li>
	                        <li className="nav-item">
	                            <a className="nav-link" href="/#/about">About</a>
	                        </li>
	                        <li className="nav-item">
	                            <a className="nav-link" href="/#/faq">FAQ</a>
	                        </li>
	                    </ul>
	                    <form className="form-inline my-2 my-lg-0">
	                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
	                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
	                    </form>
	                </div>
	            </nav>
	        	<div className="container top-buffer-lg">
		    		<form>
			    		<div className="col-2">
		                    <AddPetModal />
		                </div>
		                <p>List of pets will appear here</p>

			  			<div className="form-check top-buffer-sm">
			  				<label className="form-check-label">
			  					<input className="form-check-input" type="radio" name="locationRadios" id="locationRadiosMy" value="my" checked/>
			  					My house
			  				</label>
			  			</div>
			  			<div className="form-check">
			  				<label className="form-check-label">
			  					<input className="form-check-input" type="radio" name="locationRadios" id="locationRadiosSitter" value="sitter"/>
			  					Sitter&#39;s house
			  				</label>
			  			</div>
		    			<div className="form-group">
		  		    		<label for="exampleFormControlInput2">Start date</label>
		  		    		<input type="date" className="form-control date-box-style" id="exampleFormControlInput2" placeholder="mm/dd/yyyy"/>
		  		    	</div>
		    			<div className="form-group">
				    		<label for="exampleFormControlInput3">End date</label>
				    		<input type="date" className="form-control date-box-style" id="exampleFormControlInput2" placeholder="mm/dd/yyyy"/>
				    	</div>
						<div className="form-group row">
					    	<div className="col-sm-10">
					    		<a href="/#/search" type="submit" className="btn btn-primary">Search</a>
					    	</div>
					    </div>

				    </form>
			    </div>
		    </div>
        );
    }
}


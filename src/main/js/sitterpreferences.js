import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';
import Navbar from 'js/navbar';

export class SitterPreferences extends React.Component {
    render() {
        return (
            <div>
                <Navbar pageName='Sitter Prefs' />
	
	        	<div className="container">
	        		<form>
			    		<fieldset className="form-group">
			    			<div className="row">
			    				<legend className="col-form-legend col-sm-2">Pet types</legend>
			    				<div className="col-sm-10">
					    			<div className="form-check">
					    				<label className="form-check-label">
					    					<input className="form-check-input" type="checkbox" value="bird" />
					    					Birds
					    				</label>
					    			</div>
					    			<div className="form-check">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" value="cat" />
											Cats
										</label>
									</div>
					    			<div className="form-check">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" value="dog" />
											Dogs
										</label>
									</div>
							    	<div className="form-check">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" value="ferret" />
											Ferrets
										</label>
									</div>
							    	<div className="form-check">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" value="gerbil" />
											Gerbils
										</label>
									</div>
							    	<div className="form-check">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" value="snake" />
											Snakes
										</label>
									</div>
								</div>
							</div>
						</fieldset>
			    		<fieldset className="form-group">
			    			<div className="row">
			    				<legend className="col-form-legend col-sm-2">Location</legend>
			    				<div className="col-sm-10">
					    			<div className="form-check">
					    				<label className="form-check-label">
					    					<input className="form-check-input" type="checkbox" value="" />
					    					My house
					    				</label>
					    			</div>
					    			<div className="form-check">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" value="" />
											Owner&#39;s house
										</label>
									</div>
								</div>
							</div>
						</fieldset>
			    		<fieldset className="form-group">
			    			<div className="row">
			    				<legend className="col-form-legend col-sm-2">Availability</legend>
			    				<div className="col-sm-10">
			    				    <div className="form-group">
			    				        <label htmlFor="inputStartDate">Start date</label>
			    				        <input type="date" className="form-control date-box-style" id="inputStartDate"  placeholder="mm/dd/yyyy" />
			    				    </div>
			    				    <div className="form-group">
			    				        <label htmlFor="inputEndDate">End date</label>
			    				        <input type="date" className="form-control date-box-style" id="inputEndDate" placeholder="mm/dd/yyyy" />
			    				    </div>
								</div>
							</div>
						</fieldset>
			    		<fieldset className="form-group">
			    			<div className="row">
			    				<legend className="col-form-legend col-sm-2">Profile picture</legend>
			    				<div className="col-sm-10">
			    				    <div className="form-group">
			    				        <label htmlFor="inputStartDate">Web address of your photo</label>
			    				        <input type="url" className="form-control" id="inputPictureUrl" />
			    				    </div>
								</div>
							</div>
						</fieldset>
						<div className="form-group row">
					    	<div className="col-sm-10">
					    		<button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#sitterPrefsSavedModal">Save preferences</button>
					    	</div>
					    </div>
					    
						<div className="modal fade" id="sitterPrefsSavedModal" tabIndex="-1" role="dialog" aria-labelledby="sitterPrefsSavedModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="sitterPrefsSavedModalLabel">Preferences saved</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-footer">
							        	<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							        </div>
						      	</div>
						    </div>
						</div>
				    </form>
			    </div>
		    </div>
        );
    }
}


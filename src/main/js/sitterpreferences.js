import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';

export class SitterPreferences extends React.Component {
    render() {
        return (
        	<div className="container">
	    		<form>
		    		<fieldset className="form-group">
		    			<div className="row">
		    				<legend className="col-form-legend col-sm-2">Pet types</legend>
		    				<div className="col-sm-10">
				    			<div className="form-check">
				    				<label className="form-check-label">
				    					<input className="form-check-input" type="checkbox" value=""/>
				    					Birds
				    				</label>
				    			</div>
				    			<div className="form-check">
									<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value=""/>
										Cats
									</label>
								</div>
				    			<div className="form-check">
									<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value=""/>
										Small dogs (0-25 lbs)
									</label>
								</div>
						    	<div className="form-check">
									<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value=""/>
										Medium dogs (25-60 lbs)
									</label>
								</div>
						    	<div className="form-check">
									<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value=""/>
										Large dogs (60+ lbs)
									</label>
								</div>
						    	<div className="form-check">
									<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value=""/>
										Gerbils
									</label>
								</div>
						    	<div className="form-check">
									<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value=""/>
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
				    					<input className="form-check-input" type="checkbox" value=""/>
				    					My house
				    				</label>
				    			</div>
				    			<div className="form-check">
									<label className="form-check-label">
										<input className="form-check-input" type="checkbox" value=""/>
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
			    				<div className="form-check">
			    					<label className="form-check-label">
			    				  		<input className="form-check-input" type="radio" name="availableRadios" id="availableRadios1" value="option1" checked/>
			    				    	All the time
			    				    </label>
			    				</div>
			    				<div className="form-check">
			    					<label className="form-check-label">
			    				  		<input className="form-check-input" type="radio" name="availableRadios" id="availableRadios2" value="option2"/>
			    				    	Only for these dates:
			    				    </label>
			    				    <div className="form-group">
			    				        <label for="inputStartDate">Start date</label>
			    				        <input type="date" className="form-control date-box-style" id="inputStartDate"  placeholder="mm/dd/yyyy" disabled/>
			    				    </div>
			    				    <div className="form-group">
			    				        <label for="inputEndDate">End date</label>
			    				        <input type="date" className="form-control date-box-style" id="inputEndDate" placeholder="mm/dd/yyyy" disabled/>
			    				    </div>
			    				</div>
							</div>
						</div>
					</fieldset>
					<div className="form-group row">
				    	<div className="col-sm-10">
				    		<button type="submit" className="btn btn-primary">Save preferences</button>
				    	</div>
				    </div>
			    </form>
		    </div>
        );
    }
}


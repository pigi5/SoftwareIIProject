import React from 'react';
import { Link } from 'react-router-dom';
import { GetterButton } from 'js/buttons.js';

export class StartAppointment extends React.Component {
    render() {
        return (
        	<div className="container">
	    		<form>
	    			<div className="form-group">
	    		    	<label for="exampleFormControlInput1">Pet name</label>
	    		    	<input className="form-control" id="exampleFormControlInput1" placeholder="Pet name"/>
	    			</div>
	    			<div className="form-group">
	    		    	<label for="exampleFormControlSelect1">Pet type</label>
	    		    	<select className="form-control" id="exampleFormControlSelect1">
	    		    		<option>bird</option>
	    		    		<option>cat</option>
	    		    		<option>dog</option>
	    		    		<option>gerbil</option>
	    		    		<option>snake</option>
	    		    	</select>
	    			</div>
	    			<div className="form-group">
		  		    	<label for="exampleFormControlSelect2">Pet size</label>
		  		    	<select className="form-control" id="exampleFormControlSelect2">
		  		    		<option>small (0-25 lbs)</option>
		  		    		<option>medium (25-60 lbs)</option>
		  		    		<option>large (60+ lbs)</option>
		  		    	</select>
		  			</div>
		  			<div className="form-check">
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
			    </form>
		    </div>
        );
    }
}


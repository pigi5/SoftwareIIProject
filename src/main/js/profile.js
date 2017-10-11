import React from 'react';
import axios from 'axios';
import Navbar from 'js/navbar';

export class Profile extends React.Component {
    render() { 
        return(
            <div>
                <Navbar pageName='Profile' />
                <div className='container padded'>
                    This is the your user profile.
                </div>
            </div>
        );
    }
}
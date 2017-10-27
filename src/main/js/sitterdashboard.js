import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';

class SitterDashboard extends React.Component {
    render() { 
        return(
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        authed: store.user.authed,
        userData: store.user.userData
    };
};

export default connect(mapStateToProps)(SitterDashboard);
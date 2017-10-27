import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';

class OwnerDashboard extends React.Component {
    createPetCard(curVal, index, array) {
        return (
            <div className="card" key={index}>
                <div className="card-block card-padded">
                    <h4 className="card-title">{curVal['name']}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{curVal['type']}</h6>
                    <p className="card-text">{curVal['description']}</p>
                </div>
            </div>
        );
    }
    
    render() { 
        console.log(JSON.stringify(this.props.userData, null, 4));
        return(
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <div className="card-deck">
                        {this.props.userData.pets.map(this.createPetCard)}
                    </div>
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

export default connect(mapStateToProps)(OwnerDashboard);
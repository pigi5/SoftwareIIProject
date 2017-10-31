import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';
import { PageHeader, Tab, Nav, NavItem, Grid, Row, Col, Button } from 'react-bootstrap';

function mapPetsToForms(curVal, index, array) {
    return {...curVal, editable: false};
}

function mapFormsToPets(curVal, index, array) {
    var petFormClone = JSON.parse(JSON.stringify(curVal));
    delete petFormClone.editable;
    return petFormClone;
}

const weekdays = [
    {
        name: 'Sunday',
        abbrev: 'Sun'
    },
    {
        name: 'Monday',
        abbrev: 'Mon'
    },
    {
        name: 'Tuesday',
        abbrev: 'Tue'
    },
    {
        name: 'Wednesday',
        abbrev: 'Wed'
    },
    {
        name: 'Thursday',
        abbrev: 'Thu'
    },
    {
        name: 'Friday',
        abbrev: 'Fri'
    },
    {
        name: 'Saturday',
        abbrev: 'Sat'
    }
];

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        status: 0,
                        inputForms: {
                            name: {
                                name: 'Full Name',
                                value: this.props.userData.name,
                                type: 'text',
                                icon: 'user-o',
                                editable: false
                            },
                            email: {
                                name: 'Email',
                                value: this.props.userData.email,
                                type: 'email',
                                icon: 'envelope',
                                editable: false
                            },
                            password: {
                                name: 'Password',
                                value: this.props.userData.password,
                                type: 'password',
                                icon: 'key',
                                editable: false
                            },
                            zipCode: {
                                name: 'Zip Code',
                                value: this.props.userData.zipCode,
                                type: 'number',
                                icon: 'map-marker',
                                editable: false
                            }
                        },
                        petForms: this.props.userData.pets.map(mapPetsToForms),
                        sitterForms: {
                            availability: {
                                name: 'Days Available',
                                value: this.props.userData.availability,
                                type: 'text',
                                icon: 'calendar',
                                editable: false
                            }
                        }
                     };
    }

    userUpdated(obj) {
        this.props.dispatch({
            type: 'AUTH_USER',
            userData: obj
        });
        console.log('User Updated Profile:');
        console.log(JSON.stringify(obj, null, 4));
    }
    
    handleGeneralChange(event) {
        // have to use spread operator in order to not wipe out the rest of inputForms
        this.setState({inputForms: {...this.state.inputForms, [event.target.name]: {...this.state.inputForms[event.target.name], value: event.target.value}}});
    }
    
    cancelGeneral(event) {
        var formsClone = JSON.parse(JSON.stringify(this.state.inputForms));
        
        for (var attr in formsClone) {
            formsClone[attr].value = this.props.userData[attr];
            formsClone[attr].editable = false;
        }
        this.setState({inputForms: formsClone});
    }
    
    handleGeneralSubmit(event) {
        // update general
        /*
        axios.get('/api/login', {
                params: {
                    'username': this.state.inputValues.username,
                    'password': this.state.inputValues.password,
                    'email': this.state.inputValues.email,
                    'zipCode': this.state.inputValues.zipCode
                }
            })
            .then((response) => {
                this.setState({status: response.status});
                this.authorizeUser(response.data);
            })
            .catch((error) => {
                if (typeof error.response !== 'undefined') {
                    this.setState({status: error.response.status});
                    console.log(this.state.status);
                }
            });
        */
        event.preventDefault();
    }

    handleOwnerChange(event) {
        var arrayClone = JSON.parse(JSON.stringify(this.state.petForms));
        arrayClone[event.target.id] = {...this.state.petForms[event.target.id], [event.target.name]: event.target.value};
        this.setState({petForms: arrayClone});
    }
    
    cancelOwner(event) {
        this.setState({petForms: this.props.userData.pets.map(mapPetsToForms)});
    }
    
    handleOwnerSubmit(event) {
        // update owner

        axios.get('/api/pets/updatpets', {
                params: {
                    username: this.props.userData.username,
                    pets: this.state.petForms.map(mapFormsToPets)
                }
            })
            .then((response) => {

            })
            .catch((error) => {
                if (typeof error.response !== 'undefined') {

                    console.log(this.state.status);
                }
            });

        event.preventDefault();
    }

    handleSitterChange(event) {
        // set sitter state here
    }
    
    cancelSitter(event) {
        var sitterClone = JSON.parse(JSON.stringify(this.state.sitterForms));
        sitterClone.availability.value = this.props.userData.availability.slice();
        this.setState({sitterForms: sitterClone});
    }
    
    handleSitterSubmit(event) {
        // update sitter
        /*
        axios.get('/api/login', {
                params: {
                    availability: this.state.sitterForms.availability.values
                }
            })
            .then((response) => {
                
            })
            .catch((error) => {
                if (typeof error.response !== 'undefined') {
                    
                    console.log(this.state.status);
                }
            });
        */
        event.preventDefault();
    }
    
    createProfileFormLine(key, index) {
        var curVal = this.state.inputForms[key];
        return(
            <Row className="top-buffer-sm" key={index}>
                <Col sm={3}>
                    <legend>{curVal.name}</legend>
                </Col>
                <Col sm={7} lg={5}>
                    <div className="input-group">
                        <span className="input-group-addon"><i className={'fa fa-' + curVal.icon + ' fa-fw'} /></span>
                        <input className="form-control" name={key} type={curVal.type} placeholder={curVal.name} value={curVal.value} onChange={(event) => this.handleGeneralChange(event)} disabled={!curVal.editable} />
                        <span className="input-group-btn"><Button onClick={() => this.setState({inputForms: {...this.state.inputForms, [key]: {...this.state.inputForms[key], editable:!curVal.editable}}})} bsStyle="primary"><i className="fa fa-pencil fa-fw" /></Button></span>
                    </div>
                </Col>
            </Row>
        );
    }
    
    createPetFormLine(curVal, index) {
        var arrayClone = JSON.parse(JSON.stringify(this.state.petForms));
        return(
            <div className="bottom-buffer-sm" key={index}>
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-tag fa-fw" /></span>
                    <input id={index} className="form-control" name="name" type="text" placeholder="Name" value={curVal.name} onChange={(event) => this.handleOwnerChange(event)} disabled={!curVal.editable} />
                </div>
                <div className="input-group top-buffer-xs">
                    <span className="input-group-addon"><i className="fa fa-paw fa-fw" /></span>
                    <input id={index} className="form-control" name="type" type="text" placeholder="Type" value={curVal.type} onChange={(event) => this.handleOwnerChange(event)} disabled={!curVal.editable} />
                </div>
                <div className="input-group top-buffer-xs">
                    <span className="input-group-addon"><i className="fa fa-comment fa-fw" /></span>
                    <textarea id={index} className="form-control" name="description" type="text" placeholder="Description" value={curVal.description} onChange={(event) => this.handleOwnerChange(event)} disabled={!curVal.editable} />
                </div>
                <Row className="top-buffer-sm bottom-buffer-md">
                    <Col sm={6} className="top-buffer-xs">
                        <Button onClick={() => {
                                arrayClone[index].editable = !curVal.editable;
                                this.setState({petForms: arrayClone});
                            }} bsStyle="primary" block><i className="fa fa-pencil fa-fw" /></Button>
                    </Col>
                    <Col sm={6} className="top-buffer-xs">
                        <Button onClick={() => {
                                arrayClone.splice(index, 1);
                                this.setState({petForms: arrayClone});
                            }} bsStyle="danger" block><i className="fa fa-trash fa-fw" /></Button>
                    </Col>
                </Row>
            </div>
        );
    }
    
    createWeekdayButton(curVal, index) {
        var sitterClone = JSON.parse(JSON.stringify(this.state.sitterForms));
        var ind = sitterClone.availability.value.indexOf(curVal.name);
        var color;
        if (ind >= 0) {
            color = 'primary';
        } else {
            color = 'default';
        }
        return(
                <Button onClick={() => {
                        if (ind >= 0) {
                            sitterClone.availability.value.splice(ind, 1);
                        } else {
                            sitterClone.availability.value.push(curVal.name);
                        }
                        this.setState({sitterForms: sitterClone});
                    }} bsStyle={color} bsSize="lg" className="weekday-button" key={index} active={ind >= 0}>{curVal.abbrev}</Button>
        );
    }
    
    render() { 
        var isGeneralChanged = false;
        for (var attr in this.state.inputForms) {
            if (this.state.inputForms[attr].value != this.props.userData[attr]) {
                isGeneralChanged = true;
                break;
            }
        }
        
        var isOwnerChanged = false;
        if (this.state.petForms.length != this.props.userData.pets.length) {
            isOwnerChanged = true;
        } else {
            for (var i = 0; i < this.state.petForms.length; i++) {
                if (this.state.petForms[i].name != this.props.userData.pets[i].name || 
                        this.state.petForms[i].type != this.props.userData.pets[i].type || 
                        this.state.petForms[i].description != this.props.userData.pets[i].description) {
                    isOwnerChanged = true;
                    break;
                }
            }
        }
        
        var isSitterChanged = false;
        if (this.state.sitterForms.availability.value.length != this.props.userData.availability.length) {
            isSitterChanged = true;
        } else {
            for (var val in this.state.sitterForms.availability.value) {
                if (this.props.userData.availability.indexOf(val) < 0) {
                    isSitterChanged = true;
                    break;
                }
            }
        }
        
        return(
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <PageHeader>
                        Profile
                    </PageHeader>
                    <Tab.Container id="profile-tabs" defaultActiveKey={1}>
                        <Row>
                            <Col sm={3} md={2}>
                                <Nav bsStyle="pills" stacked>
                                    <NavItem eventKey={1}>General</NavItem>
                                    <NavItem eventKey={2}>Owner</NavItem>
                                    <NavItem eventKey={3}>Sitter</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={9} md={10}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey={1}>
                                    <Grid>
                                        <Row className="top-buffer-sm">
                                            <Col sm={3}>
                                                <legend>Username</legend>
                                            </Col>
                                            <Col sm={7} lg={5}>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-user fa-fw" /></span>
                                                    <input className="form-control" name="name" type="text" placeholder="Username" value={this.props.userData.username} disabled />
                                                </div>
                                            </Col>
                                        </Row>
                                        {Object.keys(this.state.inputForms).map((key, index) => this.createProfileFormLine(key, index))}
                                        <Row className="top-buffer-sm">
                                            <Col xs={6} sm={4} smOffset={1} md={3} mdOffset={2} lgOffset={1}>
                                                <Button block bsSize="lg" onClick={(event) => this.cancelGeneral(event)} disabled={!isGeneralChanged}>Cancel</Button>
                                            </Col>
                                            <Col xs={6} sm={4} md={3}>
                                                <Button block bsSize="lg" onClick={(event) => this.handleGeneralSubmit(event)} bsStyle="success" disabled={!isGeneralChanged}>Save</Button>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </Tab.Pane>
                                <Tab.Pane eventKey={2}>
                                    <Grid>
                                        <Row className="top-buffer-sm">
                                            <Col sm={3}>
                                                <legend>Pets</legend>
                                            </Col>
                                            <Col sm={7} lg={5}>
                                                {this.state.petForms.map((curVal, index) => this.createPetFormLine(curVal, index))}
                                                <Button onClick={() => this.setState({petForms: [...this.state.petForms, {name:'', type:'', description:'', editable:true}]})} bsStyle="success" className="bottom-buffer-sm" block>
                                                    <span>Add Pet</span>
                                                    <i className="fa fa-plus pull-left center-icon-vertical" />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row className="top-buffer-sm">
                                            <Col xs={6} sm={4} smOffset={1} md={3} mdOffset={2} lgOffset={1}>
                                                <Button block bsSize="lg" onClick={(event) => this.cancelOwner(event)} disabled={!isOwnerChanged}>Cancel</Button>
                                            </Col>
                                            <Col xs={6} sm={4} md={3}>
                                                <Button block bsSize="lg" onClick={(event) => this.handleOwnerSubmit(event)} bsStyle="success" disabled={!isOwnerChanged}>Save</Button>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </Tab.Pane>
                                <Tab.Pane eventKey={3}>
                                    <Grid>
                                        <Row className="top-buffer-sm">
                                            <Col sm={3}>
                                                <legend>{this.state.sitterForms.availability.name}</legend>
                                            </Col>
                                            <Col sm={7} lg={5}>
                                                <div className="weekday-row">
                                                    {weekdays.map((curVal, index) => this.createWeekdayButton(curVal, index))}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="top-buffer-sm">
                                            <Col xs={6} sm={4} smOffset={1} md={3} mdOffset={2} lgOffset={1}>
                                                <Button block bsSize="lg" onClick={(event) => this.cancelSitter(event)} disabled={!isSitterChanged}>Cancel</Button>
                                            </Col>
                                            <Col xs={6} sm={4} md={3}>
                                                <Button block bsSize="lg" onClick={(event) => this.handleSitterSubmit(event)} bsStyle="success" disabled={!isSitterChanged}>Save</Button>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
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

export default connect(mapStateToProps)(Profile);
import React from 'react';
import axios from 'axios';
import MyNavbar from 'js/navbar';
import { connect } from 'react-redux';
import { PageHeader, Tab, Nav, NavItem, Grid, Row, Col, Button } from 'react-bootstrap';

function getIconFromState(state) {
    if (state === 1) {
        return <i className="fa fa-times fa-fw text-danger" />;
    } else if (state === 2) {
        return <i className="fa fa-check fa-fw text-success" />;
    }
    return <i className="fa fa-asterisk fa-fw text-danger" />;
}

function mapPetsToForms(curVal, index, array) {
    var nameStat;
    if (curVal.name === '') {
        nameStat = 1;
    } else {
        nameStat = 2;
    }
    var typeStat;
    if (curVal.type === '') {
        typeStat = 1;
    } else {
        typeStat = 2;
    }
    return {...curVal, editable: false, nameStatus: nameStat, typeStatus: typeStat};
}

function mapFormsToPets(curVal, index, array) {
    var petFormClone = JSON.parse(JSON.stringify(curVal));
    delete petFormClone.editable;
    delete petFormClone.nameStatus;
    delete petFormClone.typeStatus;
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

var petTypes = [];

axios.get('/api/pets/types')
    .then((response) => {
        petTypes = response.data;
    })
    .catch((error) => {
        if (typeof error.response !== 'undefined') {
            console.log(error.response);
        }
    });

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
                    status: 2,
                    editable: false
                },
                email: {
                    name: 'Email',
                    value: this.props.userData.email,
                    type: 'email',
                    icon: 'envelope',
                    status: 2,
                    editable: false
                },
                password: {
                    name: 'Password',
                    value: this.props.userData.password,
                    type: 'password',
                    icon: 'key',
                    status: 2,
                    editable: false
                },
                zipCode: {
                    name: 'Zip Code',
                    value: this.props.userData.zipCode,
                    type: 'number',
                    icon: 'map-marker',
                    status: 2,
                    editable: false
                }
            },
            generalStatus: 0,
            petForms: this.props.userData.pets.map(mapPetsToForms),
            ownerStatus: 0,
            sitterForms: {
                availability: {
                    name: 'Availability',
                    value: this.props.userData.availability,
                    type: 'text',
                    icon: 'calendar',
                    editable: false
                },
                petPreferences: {
                    name: 'Preferences',
                    value: this.props.userData.petPreferences,
                    type: 'text',
                    icon: 'calendar',
                    editable: false
                }
            },
            sitterStatus: 0
         };
    }

    userUpdated(obj) {
        this.props.dispatch({
            type: 'UPDATE_USER',
            userData: obj
        });
        console.log('User Updated Profile:');
        console.log(JSON.stringify(this.props.userData, null, 4));
    }
    
    handleGeneralChange(event) {
        var formsClone = JSON.parse(JSON.stringify(this.state.inputForms));
        // update statuses
        if (event.target.name == 'password') {
            if (event.target.value === '') {
                formsClone.password.status = 1;
            } else {
                formsClone.password.status = 2;
            }
        } else if (event.target.name == 'name') {
            if (event.target.value === '') {
                formsClone.name.status = 1;
            } else {
                formsClone.name.status = 2;
            }
        } else if (event.target.name == 'email') {
            if (event.target.value.match(String.raw`^[a-zA-Z0-9.!#$%&’*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$`)) { //`
                formsClone.email.status = 2;
            } else {
                formsClone.email.status = 1;
            }
        } else if (event.target.name == 'zipCode') {
            if (event.target.value.length === 5) {
                formsClone.zipCode.status = 2;
            } else {
                formsClone.zipCode.status = 1;
            }
        }

        formsClone[event.target.name].value = event.target.value;

        this.setState({inputForms: formsClone});
    }
    
    cancelGeneral(event) {
        var formsClone = JSON.parse(JSON.stringify(this.state.inputForms));
        
        for (var attr in formsClone) {
            formsClone[attr].value = this.props.userData[attr];
            formsClone[attr].editable = false;
            formsClone[attr].status = 2;
        }
        this.setState({inputForms: formsClone});
    }
    
    handleGeneralSubmit(event) {
        // update general
        
        if (this.state.inputForms.name.status === 2 &&
                this.state.inputForms.email.status === 2 &&
                this.state.inputForms.password.status === 2 &&
                this.state.inputForms.zipCode.status === 2) {
            var updates = {
                name: this.state.inputForms.name.value,
                email: this.state.inputForms.email.value,
                password: this.state.inputForms.password.value,
                zipCode: this.state.inputForms.zipCode.value
            };
            
            axios.post('/api/users/update', updates, {
                    params: {
                        username: this.props.userData.username,
                    }
                })
                .then((response) => {
                    this.userUpdated(updates);
                    
                    var formsClone = JSON.parse(JSON.stringify(this.state.inputForms));
                    for (var attr in formsClone) {
                        formsClone[attr].editable = false;
                    }
                    this.setState({inputForms: formsClone, generalStatus: response.status});
                })
                .catch((error) => {
                    if (typeof error.response !== 'undefined') {
                        this.setState({generalStatus: error.response.status});
                    }
                });
        } else {
            this.setState({generalStatus: -1});
        }
        event.preventDefault();
    }

    handleOwnerChange(event) {
        var arrayClone = JSON.parse(JSON.stringify(this.state.petForms));
        
        if (event.target.name == 'name') {
            if (event.target.value === '') {
                arrayClone[event.target.id].nameStatus = 1;
            } else {
                arrayClone[event.target.id].nameStatus = 2;
            }
        } else if (event.target.name == 'type') {
            if (event.target.value === '') {
                arrayClone[event.target.id].typeStatus = 1;
            } else {
                arrayClone[event.target.id].typeStatus = 2;
            }
        }
        
        arrayClone[event.target.id][event.target.name] = event.target.value;
        this.setState({petForms: arrayClone});
    }
    
    cancelOwner(event) {
        this.setState({petForms: this.props.userData.pets.map(mapPetsToForms)});
    }
    
    handleOwnerSubmit(event) {
        // update owner

        var shouldAllow = true;
        for (var i = 0; i < this.state.petForms.length; i++) {
            if (this.state.petForms[0].nameStatus !== 2 || this.state.petForms[0].typeStatus !== 2) {
                shouldAllow = false;
                break;
            }
        }
        
        if (shouldAllow) {
            var updates = {
                pets: this.state.petForms.map(mapFormsToPets)
            };
            
            axios.post('/api/users/update', updates, {
                    params: {
                        username: this.props.userData.username,
                    }
                })
                .then((response) => {
                    this.userUpdated(updates);

                    this.setState({petForms: updates.pets.map(mapPetsToForms), ownerStatus: response.status});
                })
                .catch((error) => {
                    if (typeof error.response !== 'undefined') {
                        this.setState({ownerStatus: error.response.status});
                    }
                });
        }
        
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
        
        var updates = {
            availability: this.state.sitterForms.availability.value,
            petPreferences: this.state.sitterForms.petPreferences.value
        };


        axios.post('/api/users/update', updates, {
                params: {
                    username: this.props.userData.username,
                }
            })
            .then((response) => {
                this.userUpdated(updates);
                
                this.setState({sitterStatus: response.status});
            })
            .catch((error) => {
                if (typeof error.response !== 'undefined') {
                    this.setState({sitterStatus: error.response.status});
                }
            });

        event.preventDefault();
    }
    
    createProfileFormLine(key, index) {
        var curVal = this.state.inputForms[key];
        var addon;
        if (curVal.editable) {
            addon = (<span className="input-group-addon">{getIconFromState(curVal.status)}</span>);
        } else {
            addon = (<span className="input-group-btn"><Button onClick={() => this.setState({inputForms: {...this.state.inputForms, [key]: {...this.state.inputForms[key], editable:!curVal.editable}}})} bsStyle="primary"><i className="fa fa-pencil fa-fw" /></Button></span>);
        }
        return(
            <Row className="top-buffer-sm" key={index}>
                <Col sm={4} md={3} mdOffset={1} lgOffset={2}>
                    <legend>{curVal.name}</legend>
                </Col>
                <Col sm={8} md={7} lg={5}>
                    <div className="input-group">
                        <span className="input-group-addon"><i className={'fa fa-' + curVal.icon + ' fa-fw'} /></span>
                        <input className="form-control" name={key} type={curVal.type} placeholder={curVal.name} value={curVal.value} onChange={(event) => this.handleGeneralChange(event)} disabled={!curVal.editable} />
                        {addon}
                    </div>
                </Col>
            </Row>
        );
    }
    
    createPetFormLine(curVal, index) {
        var arrayClone = JSON.parse(JSON.stringify(this.state.petForms));
        var nameAddon = null;
        var typeAddon = null;
        if (curVal.editable) {
            nameAddon = (<span className="input-group-addon">{getIconFromState(curVal.nameStatus)}</span>);
            typeAddon = (<span className="input-group-addon">{getIconFromState(curVal.typeStatus)}</span>);
        }
        
        return(
            <div className="bottom-buffer-sm" key={index}>
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-tag fa-fw" /></span>
                    <input id={index} className="form-control" name="name" type="text" placeholder="Name" value={curVal.name} onChange={(event) => this.handleOwnerChange(event)} disabled={!curVal.editable} />
                    {nameAddon}
                </div>
                    <div className="input-group top-buffer-xs">
                    <span className="input-group-addon"><i className="fa fa-paw fa-fw" /></span>
                    <select className="form-control" required id={index} name="type" value={curVal.type} onChange={(event) => this.handleOwnerChange(event)} disabled={!curVal.editable}>
                        <option value="" disabled hidden>Pet Type</option>
                        {petTypes.map((curValInner, indexInner) => {
                            return (<option key={indexInner} value={curValInner}>{curValInner}</option>);
                        })}
                    </select>
                    {typeAddon}
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
    
    createPetTypeButton(curVal, index) {
        var sitterClone = JSON.parse(JSON.stringify(this.state.sitterForms));
        var ind = sitterClone.petPreferences.value.indexOf(curVal);
        var color;
        if (ind >= 0) {
            color = 'primary';
        } else {
            color = 'default';
        }
        return(
                <Button onClick={() => {
                        if (ind >= 0) {
                            sitterClone.petPreferences.value.splice(ind, 1);
                        } else {
                            sitterClone.petPreferences.value.push(curVal);
                        }
                        this.setState({sitterForms: sitterClone});
                    }} bsStyle={color} bsSize="lg" className="weekday-button" key={index} active={ind >= 0}>{curVal}</Button>
        );
    }
    
    render() {
        var i;
        
        var generalErrorMess = null;
        if (this.state.generalStatus == 500) {
            generalErrorMess = (<p className='text-danger text-center'>Server error. Please try again later.</p>);
        } else if (this.state.generalStatus == 200) {
            generalErrorMess = (<p className='text-success text-center'>Information saved.</p>);
        } else if (this.state.generalStatus == -1) {
            generalErrorMess = (<p className='text-danger text-center'>You must complete all required fields.</p>);
        } else if (this.state.generalStatus != 0) {
            generalErrorMess = (<p className='text-danger text-center'>An unknown error occurred.</p>);
        }
        
        var isGeneralChanged = false;
        for (var attr in this.state.inputForms) {
            if (this.state.inputForms[attr].value != this.props.userData[attr]) {
                isGeneralChanged = true;
                break;
            }
        }
        
        var isGeneralSaveable = isGeneralChanged && (this.state.inputForms.name.status === 2 &&
                this.state.inputForms.email.status === 2 &&
                this.state.inputForms.password.status === 2 &&
                this.state.inputForms.zipCode.status === 2);
        

        var ownerErrorMess = null;
        if (this.state.ownerStatus == 500) {
            ownerErrorMess = (<p className='text-danger text-center'>Server error. Please try again later.</p>);
        } else if (this.state.ownerStatus == 200) {
            ownerErrorMess = (<p className='text-success text-center'>Information saved.</p>);
        } else if (this.state.ownerStatus == -1) {
            ownerErrorMess = (<p className='text-danger text-center'>You must complete all required fields.</p>);
        } else if (this.state.ownerStatus != 0) {
            ownerErrorMess = (<p className='text-danger text-center'>An unknown error occurred.</p>);
        }
        
        var isOwnerChanged = false;
        if (this.state.petForms.length != this.props.userData.pets.length) {
            isOwnerChanged = true;
        } else {
            for (i = 0; i < this.state.petForms.length; i++) {
                if (this.state.petForms[i].name != this.props.userData.pets[i].name || 
                        this.state.petForms[i].type != this.props.userData.pets[i].type || 
                        this.state.petForms[i].description != this.props.userData.pets[i].description) {
                    isOwnerChanged = true;
                    break;
                }
            }
        }
        
        var isOwnerSaveable = isOwnerChanged;
        if (isOwnerSaveable) {
            for (i = 0; i < this.state.petForms.length; i++) {
                if (this.state.petForms[i].nameStatus !== 2 || this.state.petForms[i].typeStatus !== 2) {
                    isOwnerSaveable = false;
                    break;
                }
            }
        }

        var sitterErrorMess = null;
        if (this.state.sitterStatus == 500) {
            sitterErrorMess = (<p className='text-danger text-center'>Server error. Please try again later.</p>);
        } else if (this.state.sitterStatus == 200) {
            sitterErrorMess = (<p className='text-success text-center'>Information saved.</p>);
        } else if (this.state.sitterStatus == -1) {
            sitterErrorMess = (<p className='text-danger text-center'>You must complete all required fields.</p>);
        } else if (this.state.sitterStatus != 0) {
            sitterErrorMess = (<p className='text-danger text-center'>An unknown error occurred.</p>);
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
        var isSitterSaveable = isSitterChanged;
        
        return(
            <div>
                <MyNavbar pageUrl={this.props.match.url} />
                <div className='container'>
                    <PageHeader>
                        Profile
                    </PageHeader>
                    <Tab.Container id="profile-tabs" defaultActiveKey={1}>
                        <Row>
                            <Col sm={3} lg={2}>
                                <Nav bsStyle="pills" stacked>
                                    <NavItem eventKey={1}>General</NavItem>
                                    <NavItem eventKey={2}>Owner</NavItem>
                                    <NavItem eventKey={3}>Sitter</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={9} lg={10}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey={1}>
                                        <Row className="top-buffer-sm">
                                            <Col sm={4} md={3} mdOffset={1} lgOffset={2}>
                                                <legend>Username</legend>
                                            </Col>
                                            <Col sm={8} md={7} lg={5}>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-user fa-fw" /></span>
                                                    <input className="form-control" name="name" type="text" placeholder="Username" value={this.props.userData.username} disabled />
                                                </div>
                                            </Col>
                                        </Row>
                                        {Object.keys(this.state.inputForms).map((key, index) => this.createProfileFormLine(key, index))}
                                        <Row className="top-buffer-sm">
                                            <Col xs={6} sm={4} smOffset={2} lg={3} lgOffset={3}>
                                                <Button block bsSize="lg" onClick={(event) => this.cancelGeneral(event)} disabled={!isGeneralChanged}>Cancel</Button>
                                            </Col>
                                            <Col xs={6} sm={4} lg={3}>
                                                <Button block bsSize="lg" onClick={(event) => this.handleGeneralSubmit(event)} bsStyle="success" disabled={!isGeneralSaveable}>Save</Button>
                                            </Col>
                                        </Row>
                                        <Row className="top-buffer-sm">
                                            <Col sm={10} smOffset={1} lg={8} lgOffset={2}>
                                                {generalErrorMess}
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={2}>
                                        <Row className="top-buffer-sm">
                                            <Col sm={4} md={3} mdOffset={1} lgOffset={2}>
                                                <legend>Pets</legend>
                                            </Col>
                                            <Col sm={8} md={7} lg={5}>
                                                {this.state.petForms.map((curVal, index) => this.createPetFormLine(curVal, index))}
                                                <Button onClick={() => this.setState({petForms: [...this.state.petForms, {name:'', type:'', description:'', editable:true}]})} bsStyle="success" className="bottom-buffer-sm" block>
                                                    <span>Add Pet</span>
                                                    <i className="fa fa-plus pull-left center-icon-vertical" />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row className="top-buffer-sm">
                                            <Col xs={6} sm={4} smOffset={2} lg={3} lgOffset={3}>
                                                <Button block bsSize="lg" onClick={(event) => this.cancelOwner(event)} disabled={!isOwnerChanged}>Cancel</Button>
                                            </Col>
                                            <Col xs={6} sm={4} lg={3}>
                                                <Button block bsSize="lg" onClick={(event) => this.handleOwnerSubmit(event)} bsStyle="success" disabled={!isOwnerSaveable}>Save</Button>
                                            </Col>
                                        </Row>
                                        <Row className="top-buffer-sm">
                                            <Col sm={10} smOffset={1} lg={8} lgOffset={2}>
                                                {ownerErrorMess}
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={3}>
                                        <Row className="top-buffer-sm">
                                            <Col sm={4} md={3} mdOffset={1} lgOffset={2}>
                                                <legend>{this.state.sitterForms.availability.name}</legend>
                                            </Col>
                                            <Col sm={8} md={7} lg={5}>
                                                <div className="weekday-row">
                                                    {weekdays.map((curVal, index) => this.createWeekdayButton(curVal, index))}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="top-buffer-sm">
                                            <Col sm={4} md={3} mdOffset={1} lgOffset={2}>
                                                <legend>{this.state.sitterForms.petPreferences.name}</legend>
                                            </Col>
                                            <Col sm={8} md={7} lg={5}>
                                                <div className="weekday-row">
                                                    {petTypes.map((curVal, index) => this.createPetTypeButton(curVal, index))}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="top-buffer-sm">
                                            <Col xs={6} sm={4} smOffset={2} lg={3} lgOffset={3}>
                                                <Button block bsSize="lg" onClick={(event) => this.cancelSitter(event)} disabled={!isSitterChanged}>Cancel</Button>
                                            </Col>
                                            <Col xs={6} sm={4} lg={3}>
                                                <Button block bsSize="lg" onClick={(event) => this.handleSitterSubmit(event)} bsStyle="success" disabled={!isSitterSaveable}>Save</Button>
                                            </Col>
                                        </Row>
                                        <Row className="top-buffer-sm">
                                            <Col sm={10} smOffset={1} lg={8} lgOffset={2}>
                                                {sitterErrorMess}
                                            </Col>
                                        </Row>
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
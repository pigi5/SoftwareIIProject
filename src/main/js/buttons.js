import React from 'react';
import axios from 'axios';
import {Modal, Popover, Tooltip, Button, OverlayTrigger} from 'react-bootstrap';

export class GetterButton extends React.Component {
    constructor() {
        super();
        this.state = {
            text: 'Nothing',
            ul: <div>{'Nothing'}</div>
        };
    }
    
    textCallback(obj) {
		this.setState({ul: (
			<ul>
				<li>{'Owner Info'}
					<ul>
						<li>{'Name: ' + obj.name}</li>
						<li>{'Email: ' + obj.email}</li>
						<li>{'Pets: ' + obj.length}</li>
					</ul>
				</li>
			</ul>
		)});
	}

    addOwnerToDb(obj){
        axios.post('/api/users/add', obj)
            .catch(function(error){
            console.log(error);
        });
    }
    
    handleClick() {
        var r = Math.floor(Math.random() * 5 + 1);

        axios.get('/api/users/' + r)
             .then((response) => {
                 this.textCallback(response['data']);
                 this.addOwnerToDb(response['data']);
             })
             .catch(function(error) {
                 console.log(error);
             });
             
    }
    
    render() { 
        return(
            <div>
                <button className='button' onClick={() => this.handleClick()}>
                    {'Get a random Owner'}
                </button>
                <div>
                    {this.state.ul}
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export class TestModal extends React.Component {
    constructor() {
        super();
        this.state = {showModal: false};
        
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        const popover = (
          <Popover id="modal-popover" title="popover">
            very popover. such engagement
          </Popover>
        );
        const tooltip = (
          <Tooltip id="modal-tooltip">
            wow.
          </Tooltip>
        );

        return (
          <div>
            <p>Click to get the full Modal experience!</p>

            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={this.open}
            >
              Launch demo modal
            </Button>

            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Text in a modal</h4>
                <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                <h4>Popover in a modal</h4>
                <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

                <h4>Tooltips in a modal</h4>
                <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

                <hr />

                <h4>Overflowing text to show scroll behavior</h4>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
    }
}
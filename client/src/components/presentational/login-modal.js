import React, { Component } from 'react';
import { Modal, Form, Button, Divider } from 'semantic-ui-react';
import axios from 'axios';


const inlineStyle = {
    modal: {
        marginTop: '30%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

export default class LoginModal extends Component {
    state = { open: false}

    componentWillMount(){
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.keyCode === 76 && !this.state.open) {
                this.setState({ isOpen: true});
            }
        })
    }
    render() {
        return(
            <Modal 
                size='mini' 
                open={this.state.isOpen} 
                style={inlineStyle.modal}
                dimmer='inverted'>
                <Modal.Header>
                    Belépés
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input 
                            placeholder='email' 
                            type='email' 
                            id="email" 
                            onChange={ (event) => this.setState({ [event.target.id]: event.target.value })}/>
                        <Form.Input
                            placeholder='jelszó'
                            type='password'
                            id="password"
                            onChange={(event) => this.setState({ [event.target.id]: event.target.value })} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative compact content='mégsem' floated='left' onClick={() => this.setState({isOpen: false})}/>
                    <Button positive 
                        compact 
                        content='belépés' 
                        floated='right' 
                        onClick={(event) => {
                            console.log(this.state);
                        }}/>
                    <Divider horizontal />
                </Modal.Actions>
            </Modal>
        );
    }
}
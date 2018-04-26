import React, { Component } from 'react';
import { connect } from 'react-redux';
import {isAuthenticated, isLoginModalOpen, setAuthToken} from "../../actions/auth";
import { Modal, Form, Button, Divider, Message, Icon} from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'js-cookie';


const inlineStyle = {
    modal: {
        marginTop: '10%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

const mapDispatchToProps = dispatch => {
    return {
        isAuthenticated: bool => dispatch(isAuthenticated(bool)),
        setOpen: bool => dispatch(isLoginModalOpen(bool)),
        setAuthToken: token => dispatch(setAuthToken(token)),
    }
}

const mapStateToProps = state => {
    return { isOpen: state.auth.isLoginModalOpen }
}

export class LoginModal extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentWillMount(){
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.keyCode === 76 && !this.state.open) {
                this.setState({ isOpen: true, hasError: false, errorMessage: ''});
            }
        })
    }

    checkValidity(event){
        const { email, password } = this.state;

        axios.post('/api/login', { email: email, password: password})
            .then( response => {
                console.log(response);
                if (response.data.hasOwnProperty('error')){
                    this.props.isAuthenticated(false);
                    this.setState({hasError: true, errorMessage: response.data.error})
                } else {
                    Cookies.set('trdToken', response.data.token);
                    this.props.isAuthenticated(true);
                    this.props.setAuthToken(response.data.token);
                    this.props.setOpen(false);
                    this.setState({isOpen: false, hasError: false, errorMessage: ''})
                }
            });
    }

    render() {
        const errorMessage = this.state.hasError ? <Message negative>{this.state.errorMessage}</Message> : '';
        return(
            <Modal 
                size='mini' 
                open={this.props.isOpen}
                style={inlineStyle.modal}
                dimmer='blurring'>
                <Modal.Header>
                    <Icon name="key"/>
                    Belépés
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input 
                            placeholder='email' 
                            type='email' 
                            id="email"
                            icon='mail'
                            iconPosition='left'
                            onChange={ (event) => this.setState({ [event.target.id]: event.target.value })}/>
                        <Form.Input
                            placeholder='jelszó'
                            type='password'
                            id="password"
                            icon='key'
                            iconPosition='left'
                            onChange={(event) => this.setState({ [event.target.id]: event.target.value })} />
                            { errorMessage }
                        <Form.Field>
                            <div>
                            <Button 
                                negative 
                                compact 
                                content='Mégsem'
                                icon='cancel'
                                labelPosition='left'
                                floated='left'
                                onClick={() => this.props.setOpen(false)}/>
                            <Button 
                                positive 
                                compact 
                                content='Belépés' 
                                icon='right arrow' 
                                labelPosition='right'
                                floated='right'
                                onClick={this.checkValidity.bind(this)}/>
                            </div>
                        </Form.Field>
                        <Divider horizontal/>
                        <Divider horizontal />
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
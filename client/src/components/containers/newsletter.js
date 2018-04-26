import React, {Component} from 'react';
import {Segment, Icon, Form, Label, Message} from 'semantic-ui-react';
import axios from 'axios';

export class NewsLetter extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            firstName: '',
            message: '',
            isLoading: false,
            isSuccess: false,
        }
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(){
        this.setState({ isLoading: true });
        axios.post('/api/newsletter', this.state)
            .then(response => {
                this.setState({
                    isLoading: false,
                    message: "A feliratkozás véglegesítéséhez szükséges email kiküldtük az email címedre!",
                    email: '',
                    firstName: '',
                    isSuccess: true
                })
            })
            .catch( e => {
                this.setState({
                    isLoading: false,
                    message: "Ez az emailcím már szerepel a regisztrált hírlevél olvasók között!",
                    isSuccess: false
                })
            });
    }

    render(){
        return(
            <Segment>
                <Label color='green' size="large" ribbon>
                    <Icon name="mail"/>Hírlevél
                </Label>
                <br/>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input placeholder='Az Ön keresztneve' id="firstName" icon='font' iconPosition='left' required onChange={this.handleChange} value={this.state.firstName}/>
                    <Form.Input type='email' id="email" placeholder='Az Ön email címe' icon='mail' iconPosition='left' required onChange={this.handleChange} value={this.state.email}/>
                    {
                        this.state.message !== '' ?
                            <Message color={this.state.isSuccess ? "green" : "red"}>
                                {this.state.message}
                            </Message>
                            : ''
                    }
                    <Form.Button
                        type="submit"
                        loading={this.state.isLoading}
                        disabled={this.state.isSuccess}
                        inverted
                        fluid
                        color='green'
                        icon="signup"
                        content='Feliratkozás' />
                </Form>
            </Segment>
        );
    }
}

export default NewsLetter;
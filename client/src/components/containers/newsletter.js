import React, {Component} from 'react';
import {Segment, Form, Label, Message} from 'semantic-ui-react';
import axios from 'axios';

export class NewsLetter extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            firstName: '',
            result: '',
            isLoading: false,
            isSuccess: false,
        }
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async handleSubmit() {
        this.setState({isLoading: true});
        try {
            const response = await axios.post('/api/newsletter', this.state);
            this.setState({
                result: <Message icon="check" size="tiny" positive
                                 content={response.data.message}/>,
                isLoading: false
            });
        } catch (e) {
            this.setState({
                result: <Message icon="exclamation triangle" size="tiny" negative
                                 content={e.response.data.message}/>,
                isLoading: false
            });
        }
    }

    render(){
        return(
            <Segment>
                <Label color='green' size="large" ribbon icon="mail" content="Hírlevél"/>
                <br/>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input placeholder='Az Ön keresztneve' id="firstName" icon='font' iconPosition='left' required onChange={this.handleChange} value={this.state.firstName}/>
                    <Form.Input type='email' id="email" placeholder='Az Ön email címe' icon='mail' iconPosition='left' required onChange={this.handleChange} value={this.state.email}/>
                    {this.state.result}
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
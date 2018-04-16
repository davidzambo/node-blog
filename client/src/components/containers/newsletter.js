import React, {Component} from 'react';
import {Card, Form} from 'semantic-ui-react';
import axios from 'axios';

export class NewsLetter extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            firstName: ''
        }
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(){
        axios.post('/api/newsletter', this.state)
            .then(response => console.log(response.data));
    }

    render(){
        return(
            <Card fluid >
                <Card.Content header='Hírlevél' textAlign='center'/>
                <Card.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input placeholder='Az Ön keresztneve' id="firstName" icon='font' iconPosition='left' required onChange={this.handleChange} value={this.state.firstName}/>
                        <Form.Input type='email' id="email" placeholder='Az Ön email címe' icon='mail' iconPosition='left' required onChange={this.handleChange} value={this.state.email}/>
                        <Form.Button type="submit" basic fluid color='green' content='Feliratkozás' />
                    </Form>
                </Card.Content>
            </Card>
        );
    }
}

export default NewsLetter;
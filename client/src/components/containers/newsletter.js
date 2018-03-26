import React, {Component} from 'react';
import {Card, Form} from 'semantic-ui-react';

export class NewsLetter extends Component {
    render(){
        return(
            <Card>
                <Card.Content header='Hírlevél' textAlign='center'/>
                <Card.Content>
                    <Form>
                        <Form.Input placeholder='Az Ön keresztneve' icon='font' iconPosition='left'/>
                        <Form.Input placeholder='Az Ön életkora' icon='calendar' iconPosition='left'/>
                        <Form.Input type='email' placeholder='Az Ön email címe' icon='mail' iconPosition='left'/>
                        <Form.Button basic fluid color='green' content='Feliratkozás' />
                    </Form>
                </Card.Content>
            </Card>
        );
    }
}

export default NewsLetter;
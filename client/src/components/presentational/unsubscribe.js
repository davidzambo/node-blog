import React from 'react';
import {Header, Icon, Segment, Divider, Form, Message} from 'semantic-ui-react';
import Layout from './layout';
import axios from 'axios';

export default class Unsubscribe extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            result: ''
        };
    }

    handleChange(e){
        this.setState({email: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        try{
            const response = await axios({
                url: '/api/newsletter',
                method: 'delete',
                data: {
                    email: this.state.email,
                }
            });
            this.setState({
                result: <Message icon="check" positive
                                 header={response.data.message}/>
            });
        } catch (e){
            this.setState({
                result: <Message icon="exclamation triangle" negative
                                 header={e.response.data.message}/>
            })
        }

    }

    render() {
        return (
            <Layout>
                <Segment>
                    <Header dividing>
                        <Header.Content>
                            <Icon name="cancel" color="red"/>
                            Hírlevél leiratkozás
                        </Header.Content>
                    </Header>
                    <Divider horizontal/>
                    <h3>Köszönöm, hogy a rendszeres hírlevélolvasóim között tudhattalak.</h3>
                    <p>Amennyiben szeretnél leiratkozni levelemről, úgy az emailcímed elküldésével leveszünk a levelezőlistánkról.</p>
                    <h5>Fontos, hogy a leiratkozás esetén nem csak a levelezőlistámról íratkozol le, hanem automatikusan törlünk minden veled kapcsolatos kezelt adatot is a rendszerünkből!</h5>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group inline>
                            <Form.Input
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                                placeholder="Az ön emailcíme:"/>
                            <Form.Button
                                type="submit"
                                icon="cancel"
                                color="red"
                                labelPosition="left"
                                content="Leiratkozom"/>
                        </Form.Group>
                    </Form>
                    {this.state.result}
                </Segment>
            </Layout>
        )
    }
}
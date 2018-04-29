import React from 'react';
import {Header, Segment, Divider, Button, Message} from 'semantic-ui-react';
import Layout from '../layout';
import axios from 'axios';

export default class Confirm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            result: '',
        }
    }
    async componentWillMount(){
        try{
            const response = await axios.put(`/api/newsletter${this.props.location.search}`);
            this.setState({
                result: <Message icon="check" positive header="Gratulálunk!" content={response.data.message}/>});
        } catch (e){
            this.setState({
                result: <Message icon="exclamation circle" negative header="Whoops" content={e.response.data.message}/>,
            });
        }
    }

    render() {
        return (
            <Layout>
                <Segment>
                    <Header dividing icon="mail" content="Hírlevél feliratkozás megerősítése" />
                    <Divider horizontal/>

                    {this.state.result}

                    <Button
                        color="blue"
                        icon="angle left"
                        labelPosition="left"
                        content="vissza"
                        onClick={() => window.history.back()}/>
                </Segment>
            </Layout>
        )
    }
}
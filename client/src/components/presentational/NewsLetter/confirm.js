import React from 'react';
import {Header, Segment, Divider, Button} from 'semantic-ui-react';
import Layout from '../layout';
import axios from 'axios';

export default class Confirm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
        }
    }
    async componentWillMount(){
        try{
            const response = await axios.put(`/api/newsletter${this.props.location.search}`);
            this.setState({message: response.data.message});
        } catch (e){
            console.log(e);
            if (e.response.status === 304){
                this.setState({
                    message: 'Valami hiba történt',
                });
            }
        }
    }

    render() {
        return (
            <Layout>
                <Segment>
                    <Header dividing icon="mail" content="Hírlevél feliratkozás megerősítése" />
                    <Divider horizontal/>
                    <p>
                        {this.state.message}
                    </p>
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
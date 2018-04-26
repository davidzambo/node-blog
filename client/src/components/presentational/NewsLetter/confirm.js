import React from 'react';
import {Header, Icon, Segment, Divider, Button} from 'semantic-ui-react';
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
            console.log(response);
            this.setState({message: response.data.message});
        } catch (e){
            console.log(e);
            this.setState({message: e.data.message})
        }
    }

    render() {
        return (
            <Layout>
                <Segment>
                    <Header dividing>
                        <Header.Content>
                            <Icon name="mail" color="green"/>
                            Hírlevél feliratkozás megerősítése
                        </Header.Content>
                    </Header>
                    <Divider horizontal/>
                    <p>
                        {this.state.message}
                    </p>
                    <Button color="blue" icon="back" onClick={() => window.history.back()}>vissza</Button>
                </Segment>
            </Layout>
        )
    }
}
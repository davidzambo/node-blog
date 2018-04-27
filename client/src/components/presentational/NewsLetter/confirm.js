import React from 'react';
import {Header, Segment, Divider, Button, Message} from 'semantic-ui-react';
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
            this.setState({message: <Message icon="check" positive header="Gratulálunk!" content={response.data.message}/>});
        } catch (e){
            if (e.response.status === 304){
                this.setState({
                    message: <Message icon="exclamation circle" negative header="Whoops" content="A megerősítés során hiba lépett fel. Kérem ellenőrizze az emailben kapott linket. Amennyiben ismételten sem sikerül az emailcímének megerősítése, úgy az ismételt feliratokozás után új emailt küldünk ki önnek!"/>,
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

                    {this.state.message}

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
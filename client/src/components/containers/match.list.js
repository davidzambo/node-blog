import React from 'react';
import axios from 'axios';
import Layout from '../presentational/layout';
import Match from "../presentational/match";

class MatchList extends React.Component{
    constructor(props){
        super(props)
        this.state  = {
            matches: []
        }
    }

    componentWillMount(){
        axios.get('/api/matches')
            .then( response => {
                this.setState({matches: response.data.matches});
            })
    }

    render(){
        console.log(this.state.matches);
        const {matches}= this.state;
        return(
            <Layout>
                {matches.map(match => {
                    return <Match details={match} key={match._id} />
                })}
            </Layout>
        );
    }
}

export default MatchList;
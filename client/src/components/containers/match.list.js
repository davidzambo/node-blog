import React from 'react';
import Layout from '../presentational/layout';
import Match from "../presentational/match";
import ConfirmModal from "../presentational/confirm-modal";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Button} from "semantic-ui-react";

const mapStateToProps = state => {
    return {
        matches: state.match.matches,
        isAuthenticated: state.auth.isAuthenticated,
    }
};

class MatchList extends React.Component{
    render(){
        const {matches}= this.props;
        return(
            <Layout>
                {matches.map(match => {
                    return <Match details={match} key={match._id} />
                })}
                {this.props.isAuthenticated && <Button as={Link} floated="right" to="/meccsek/uj" color="blue" content="Új meccs"/>}
                <ConfirmModal/>
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(MatchList);
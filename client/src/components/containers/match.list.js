import React from 'react';
import Layout from '../presentational/layout';
import Match from "../presentational/match";
import ConfirmDeleteModal from "../presentational/confirm-delete-modal";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        matches: state.match.matches,
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
                <ConfirmDeleteModal/>
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(MatchList);
import React from 'react';
import Layout from '../presentational/layout';
import Match from "../presentational/match";
import ConfirmModal from "../presentational/confirm-modal";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Button, Segment, Header, Icon, Divider} from "semantic-ui-react";

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
                <Segment padded="very">
                    <Header as="h1">
                        <Icon name="calendar plus"/>
                        <Header.Content>
                            Következő mérkőzéseink
                        </Header.Content>
                    </Header>
                    <Divider horizontal/>
                    {matches.filter(match => {
                        const matchDate = new Date(match.matchDate).getTime();
                        const today = new Date().getTime();
                        return matchDate > today;
                    } ).map(match => {
                        return <Match details={match} key={match._id} />
                    })}
                    {this.props.isAuthenticated && <Button as={Link} floated="right" to="/meccsek/uj" color="blue" content="Új meccs"/>}
                </Segment>
                <ConfirmModal/>
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(MatchList);
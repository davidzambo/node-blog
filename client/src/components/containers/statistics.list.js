import React from 'react';
import Layout from "../presentational/layout";
import axios from "axios";
import {Header, Table, Button, Segment, Icon} from "semantic-ui-react";
import Statistics from "../presentational/statistics";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

class StatisticsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            statistics: []
        };
    }

    async componentWillMount(){
        const response = await axios.get('/api/statistics');
        if (response.data.statistics){
            const {statistics} = response.data;
            this.setState({statistics});
        }
    }

    render(){
        const { statistics } = this.state;
        return (
            <Layout>
                <Segment>
                    <Header as="h1">
                        <Icon name="line chart"/>
                        <Header.Content>
                            Statisztikáim
                        </Header.Content>
                    </Header>
                    <Table size="small" compact celled textAlign="center">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell><em>szezon</em></Table.HeaderCell>
                                <Table.HeaderCell><em>csapat</em></Table.HeaderCell>
                                <Table.HeaderCell><em>liga</em></Table.HeaderCell>
                                <Table.HeaderCell><em>korosztály</em></Table.HeaderCell>
                                <Table.HeaderCell><em>meccsek</em></Table.HeaderCell>
                                <Table.HeaderCell title="győzelem/döntetlen/vereség"><em>eredmény</em></Table.HeaderCell>
                                <Table.HeaderCell><em>helyezés</em></Table.HeaderCell>
                                {this.props.isAuthenticated && <Table.HeaderCell> </Table.HeaderCell>}
                                {this.props.isAuthenticated && <Table.HeaderCell> </Table.HeaderCell>}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {statistics.map( (statistic, i) => <Statistics key={i} details={statistic}/> )}
                        </Table.Body>
                    </Table>
                    { this.props.isAuthenticated && <Button as={Link} to="/statisztika/uj" color="blue" content="Új statisztika"/>}
                </Segment>
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(StatisticsList);
import React from 'react';
import {Layout} from "../presentational/layout";
import axios from "axios";
import {Header, Table, Button} from "semantic-ui-react";
import {Statistics} from "../presentational/statistics";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export class StatisticsList extends React.Component {
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
                <Header content='Statisztikáim' />
                <Table size="small" color="red">
                    <Table.Header>
                        <Table.Row>
                            <td>szezon</td>
                            <td>csapat</td>
                            <td>Meccsek</td>
                            <td>Győzelem</td>
                            <td>Döntetlen</td>
                            <td>Vereség</td>
                            <td>Helyezés</td>
                            <td></td>
                            <td></td>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {statistics.map( (statistic, i) => <Statistics key={i} details={statistic}/> )}
                    </Table.Body>
                </Table>
                { this.props.isAuthenticated && <Button as={Link} floated="right" to="/statisztikak/uj" color="blue" content="Új statisztika"/>}
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(StatisticsList);
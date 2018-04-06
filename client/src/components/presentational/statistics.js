import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Table} from 'semantic-ui-react';
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export class Statistics extends React.Component {
    render() {
        const s = this.props.details;

        return (
            <Table.Row>
                <Table.Cell>{s.season}</Table.Cell>
                <Table.Cell>{s.team}</Table.Cell>
                <Table.Cell>{s.win + s.draw + s.loss}</Table.Cell>
                <Table.Cell>{s.win}</Table.Cell>
                <Table.Cell>{s.draw}</Table.Cell>
                <Table.Cell>{s.loss}</Table.Cell>
                <Table.Cell>{s.finalPosition}</Table.Cell>

                {this.props.isAuthenticated && <Table.Cell><Button as={Link} to={`/statisztikak/${s._id}/szerkesztes`} icon="edit" color="orange"/></Table.Cell>}
                {this.props.isAuthenticated && <Table.Cell><Button icon="trash" color="red"/></Table.Cell>}
            </Table.Row>
        );
    }
}

export default connect(mapStateToProps)(Statistics);
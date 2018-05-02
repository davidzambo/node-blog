import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Table} from 'semantic-ui-react';
import {connect} from "react-redux";
import axios from "axios/index";
import {setEntity, resetConfirm, setHeader, setOnCancel, setOnConfirm, setOpen, setQuestion} from "../../actions/confirm";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setOpen: bool => dispatch(setOpen(bool)),
        setEntity: obj => dispatch(setEntity(obj)),
        setQuestion: question => dispatch(setQuestion(question)),
        setHeader: header => dispatch(setHeader(header)),
        setOnConfirm: func => dispatch(setOnConfirm(func)),
        setOnCancel: func => dispatch(setOnCancel(func)),
        resetConfirm: () => dispatch(resetConfirm()),
    };
};

class Statistics extends React.Component {
    handleDelete() {
        const statistic = this.props.details;
        this.props.setEntity(statistic);
        this.props.setQuestion(`Biztosan törölni szeretné a(z) <h3>${statistic.season} - ${statistic.team}</h3> szezont?`);
        this.props.setHeader('Statisztika törlése');
        this.props.setOnConfirm(() => {
            axios({
                url: '/api/statistics/',
                method: 'delete',
                data: statistic
            })
                .then( response => {
                    if (response.status === 200) {
                        this.props.update(response.data.statistics);
                        this.props.resetConfirm();
                    }
                });
        });
        this.props.setOnCancel(() => {
            this.props.resetConfirm();
        })
        this.props.setOpen(true);
    }

    render() {
        const s = this.props.details;
        return (
            <Table.Row>
                <Table.Cell>{s.season}</Table.Cell>
                <Table.Cell>{s.team}</Table.Cell>
                <Table.Cell>{s.league}</Table.Cell>
                <Table.Cell>{s.ageGroup}</Table.Cell>
                <Table.Cell>{s.win + s.draw + s.loss}</Table.Cell>
                <Table.Cell title="győzelem/döntetlen/vereség">{`${s.win} / ${s.draw} / ${s.loss}`}</Table.Cell>
                <Table.Cell>{s.finalPosition}.</Table.Cell>

                {this.props.isAuthenticated && <Table.Cell><Button as={Link} to={`/statisztika/${s._id}/szerkesztes`} icon="edit" color="orange"/></Table.Cell>}
                {this.props.isAuthenticated && <Table.Cell><Button icon="trash" color="red" onClick={() => this.handleDelete()}/></Table.Cell>}
            </Table.Row>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
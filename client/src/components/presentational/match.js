import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Grid, Header, Segment, Button, Divider, Icon} from 'semantic-ui-react';
import moment from 'moment';
import {
    setEntity, setQuestion, setHeader, setOnConfirm, setOpen, setOnCancel,
    resetConfirm
} from "../../actions/confirm";
import {setMatches} from "../../actions/match";


const mapStateToProps = state => {
    return {isAuthenticated: state.auth.isAuthenticated}
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
        setMatches: matches => dispatch(setMatches(matches))
    }
};

export class Match extends React.Component {

    handleDelete(){
        const match = this.props.details;
        this.props.setEntity(match);
        this.props.setQuestion(`Biztosan törölni szeretné a(z) ${match.team} vs. ${match.vsTeam} mérkőzést?`);
        this.props.setHeader('Meccs törlése');
        this.props.setOnConfirm(() => {
            axios({
                url: '/api/matches/',
                method: 'delete',
                data: match,
            })
                .then( response => {
                    if (response.status === 200) {
                        this.props.setMatches(response.data.matches);
                        this.props.resetConfirm();
                    }
                });
        });
        this.props.setOnCancel(() => {
            this.props.resetConfirm();
        });
        this.props.setOpen(true);
    }

    render() {
        const match = this.props.details;
        const date = moment(match.matchDate);
        return (
            <Segment>
                <Grid stretched>
                    <Grid.Column mobile={4} tablet={3} computer={2} color={'blue'}>
                        <Header as={'h4'} className='no-margin' textAlign='center'
                                content={date.format('MMMM')}/>
                        <Header as={'h2'} className='no-margin' textAlign='center'
                                content={date.format('DD')}/>
                        <Header as={'h5'} className='no-margin' textAlign='center'
                                content={date.format('HH:mm')}/>
                    </Grid.Column>
                    <Grid.Column mobile={9} tablet={11} computer={12}>
                        <Header as='h2' className='no-margin d-inline'>{match.team} vs. {match.vsTeam}</Header><Header as='h4' className='no-margin d-inline'>({match.ageGroup}, {match.league}. liga)</Header>
                        <Header as='h3' className='no-margin'>{match.city}</Header>
                    </Grid.Column>
                    {
                        this.props.isAuthenticated &&
                            <Grid.Column width={2}>
                                <Link
                                    to={`/meccsek/${match._id}/szerkesztes`}
                                    className='ui orange button'>
                                    <Icon name='edit'/>
                                </Link>
                                <Divider horizontal/>
                                <Button fluid color="red" icon="trash" title="törlés" onClick={this.handleDelete.bind(this)}/>
                            </Grid.Column>
                    }

                </Grid>
            </Segment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Match);
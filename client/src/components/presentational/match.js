import React from 'react';
import {Grid, Header, Segment} from 'semantic-ui-react';
import moment from 'moment';

export default class Match extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const match = this.props.details;
        const date = new Date(match.matchDate);
        return (
            <Segment>
                <Grid divided stretched>
                    <Grid.Column width={5}>
                        <Header as={'h3'} className='no-margin' textAlign='center'
                                content={moment(match.matchDate).format('MMMM')}/>
                        <Header as={'h1'} className='no-margin' textAlign='center'
                                content={moment(match.matchDate).format('d')}/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Header as='h2' className='no-margin'>{match.team} vs. {match.vsTeam}</Header>
                        <Header as='h4' className='no-margin'>({match.ageGroup}, {match.league}. liga)</Header>
                        <Header as='h3' className='no-margin'>{match.city}</Header>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}
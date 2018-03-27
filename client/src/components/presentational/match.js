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
        const now = new Date();
        console.log(now.getTime());
        const time = new Date(1522081071754);
        console.log(time.getDate());
        console.log(date.getFullYear() + date.getMonth() + date.getDate())
        return (
            <Segment>
                <Grid divided stretched>
                    <Grid.Column mobile={6} tablet={3} computer={2} color={'blue'}>
                        <Header as={'h3'} className='no-margin' color='white' textAlign='center'
                                content={moment(match.matchDate).format('MMMM')}/>
                        <Header as={'h1'} className='no-margin' textAlign='center'
                                content={date.getDay()}/>
                    </Grid.Column>
                    <Grid.Column mobile={10} tablet={13} computer={14}>
                        <Header as='h2' className='no-margin'>{match.team} vs. {match.vsTeam}</Header>
                        <Header as='h4' className='no-margin'>({match.ageGroup}, {match.league}. liga)</Header>
                        <Header as='h3' className='no-margin'>{match.city}</Header>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}
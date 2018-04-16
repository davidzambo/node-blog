import React from 'react';
import {Grid, Header} from 'semantic-ui-react';
import moment from 'moment';

export default class CalendarMatch extends React.Component {

    render() {
        const match = this.props.details;
        const date = moment(match.matchDate);
        return (
            <Grid>
                <Grid.Column width={4} color='orange' className="half-padded">
                    <Header as='h5' className='no-margin' textAlign='center'
                            content={date.format('HH:mm')}/>
                </Grid.Column>
                <Grid.Column width={12} color="yellow" className="half-padded">
                    <Header as='h5' className='no-margin'>{match.team} - {match.vsTeam}</Header>
                    <p className='no-margin match-info'><small>({match.ageGroup}, {match.league}. liga)</small></p>
                    <p className='no-margin match-info'><small>{`${match.city}, ${match.address}`}</small></p>
                </Grid.Column>
            </Grid>
        );
    }
}
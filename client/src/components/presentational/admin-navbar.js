import React, {Component} from 'react';
import {Grid, Icon} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

export class AdminNavbar extends Component {
    render() {
        return (
            <Grid>
                <Grid.Column width={16}>
                    <NavLink to='/uj' className='ui fluid blue basic button'><Icon name='write' color='blue'/> Új cikk</NavLink>
                    <NavLink to='/meccsek/uj' className='ui fluid red basic button'><Icon name='write' color='blue'/> Új meccs</NavLink>
                </Grid.Column>
            </Grid>
        );

    }
}

export default AdminNavbar;
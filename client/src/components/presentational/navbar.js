import React from 'react';
import {connect} from 'react-redux';
import {isAuthenticated, isLoginModalOpen} from "../../actions/auth";
import {Grid, Menu, Icon} from 'semantic-ui-react';
import {NavLink, withRouter} from 'react-router-dom';


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isAuthenticated,
        active: state.navbar
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        setOpen: bool => dispatch(isLoginModalOpen(bool)),
        isAuthenticated: bool => dispatch(isAuthenticated(bool)),
    }
}


class Navbar extends React.Component {
    render() {
        if (this.props.isLoggedIn) {
            return (
                <Grid>
                    <Grid.Column width={16}>
                        <Menu attached='top' tabular>
                            <Menu.Item as={NavLink} exact to='/'><Icon name='home' color='blue'/>Kezdőlap</Menu.Item>
                            <Menu.Item as={NavLink} exact to='/uj'><Icon name='write' color='blue'/>Új bejegyzés</Menu.Item>
                            <Menu.Item as={NavLink} exact to='/en-igy-gondolom'><Icon name='idea' color='blue'/>Én így gondolom</Menu.Item>
                            <Menu.Item as={NavLink} exact to='/kezilabda'><Icon name='futbol outline' color='blue'/> Kézilabda</Menu.Item>
                            <Menu.Item as={NavLink} exact to='/statisztikak'><Icon name='line chart' color='blue' />Statisztikáim</Menu.Item>
                            <Menu.Item as={NavLink} exact to='/rolam'><Icon name='user circle' color='blue'/>Rólam</Menu.Item>
                            <Menu.Item onClick={() => this.props.isAuthenticated(false)}><Icon name='sign out alternate' color='blue'/>Kilépés</Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid>
            );

        } else {
            return (
                <Grid>
                    <Grid.Column width={16}>
                        <Menu fluid tabular>
                            <Menu.Item as={NavLink} exact to='/'><Icon name='home' color='blue'/>Kezdőlap</Menu.Item>
                            <Menu.Item as={NavLink} exact to='/en-igy-gondolom'><Icon name='idea' color='blue'/>Én így gondolom</Menu.Item>
                            <Menu.Item as={NavLink} exact to='/kezilabda'><Icon name='futbol outline' color='blue'/> Kézilabda</Menu.Item>
                            <Menu.Item as={NavLink} exact to='/statisztikak'><Icon name='line chart' color='blue' />Statisztikáim</Menu.Item>
                            <Menu.Item as={NavLink} exact to='/rolam'><Icon name='user circle' color='blue'/>Rólam</Menu.Item>
                            <Menu.Item onClick={() => this.props.setOpen(true)}><Icon name='sign in alternate' color='blue'/>Belépés</Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
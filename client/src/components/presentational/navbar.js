import React from 'react';
import {connect} from 'react-redux';
import {isAuthenticated, isLoginModalOpen} from "../../actions/auth";
import {Grid, Menu, Icon} from 'semantic-ui-react';
import {NavLink, withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';


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
        return (
            <Grid>
                <Grid.Column width={16}>
                    <Menu attached='top' tabular>
                        <Menu.Item as={NavLink} exact to='/'><Icon name='home' color='blue'/>Kezdőlap</Menu.Item>
                        <Menu.Item as={NavLink} exact to='/en-igy-gondolom/'><Icon name='idea' color='blue'/>Én így gondolom</Menu.Item>
                        <Menu.Item as={NavLink} exact to='/kezilabda/'><i className="blue futbol outline icon" /> Kézilabda</Menu.Item>
                        <Menu.Item as={NavLink} exact to='/statisztikak'><Icon name='line chart' color='blue' />Statisztikáim</Menu.Item>
                        <Menu.Item as={NavLink} exact to='/rolam'><Icon name='user circle' color='blue'/>Rólam</Menu.Item>
                        {this.props.isLoggedIn ?

                            <Menu.Item onClick={() => {
                                this.props.isAuthenticated(false);
                                Cookies.remove('token');
                            }}><i
                                className="blue sign out alternate icon"/> Kilépés</Menu.Item> :

                            <Menu.Item onClick={() => this.props.setOpen(true)}><Icon name='sign in alternate'
                                                                                      color='blue'/>Belépés</Menu.Item>
                        }
                    </Menu>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
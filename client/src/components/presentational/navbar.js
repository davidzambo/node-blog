import React from 'react';
import {connect} from 'react-redux';
import {isAuthenticated, isLoginModalOpen} from "../../actions/auth";
import {setNavbarOpen} from "../../actions/navbar";
import {Divider, Icon, Menu, Dropdown } from 'semantic-ui-react';
import {NavLink, withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isAuthenticated,
        active: state.navbar.isNavbarOpen
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        setOpen: bool => dispatch(isLoginModalOpen(bool)),
        isAuthenticated: bool => dispatch(isAuthenticated(bool)),
        setNavbarOpen: bool => dispatch(setNavbarOpen(bool))
    }
}

const menuTitleStyle={
    display: 'inline',
    marginTop: 3,
}

class Navbar extends React.Component {
    render() {
        const authMenuItem =
            this.props.isLoggedIn ?
                <Dropdown trigger={<div><Icon name='settings' size="large"/><h4 style={menuTitleStyle}> Adminisztráció</h4></div>} className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} exact to='/bejegyzesek/uj'><Icon name='write' size="large"/> Új cikk</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item as={NavLink} exact to='/statisztika/uj'><Icon name='write' size="large"/> Új statisztika</Dropdown.Item>
                        <Dropdown.Item as={NavLink} exact to='/statisztika'><Icon name='write' size="large"/> Statisztikák kezelése</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item as={NavLink} exact to='/meccsek/uj'>Új meccs</Dropdown.Item>
                        <Dropdown.Item as={NavLink} exact to='/meccsek/'>Meccsek kezelése</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={() => {
                            this.props.isAuthenticated(false);
                            Cookies.remove('trbToken');
                        }}><i className="white sign out alternate icon large"/>Kilépés</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> :
                <Menu.Item onClick={() => this.props.setOpen(true)}><i className='sign in alternate icon large' /><h4 style={menuTitleStyle}>Belépés</h4></Menu.Item>;

        return (

            <Menu stackable fluid inverted borderless color="teal" fixed="top" style={{marginTop: 14}}>
                <Divider horizontal/>
                <Menu.Item as={NavLink} exact to='/'><Icon name='home' size="large"/><h4 style={menuTitleStyle}>Kezdőlap</h4></Menu.Item>
                <Menu.Item as={NavLink} exact to='/en-igy-gondolom/'><Icon name='idea' size="large"/><h4 style={menuTitleStyle}>Én így gondolom</h4></Menu.Item>
                <Menu.Item as={NavLink} exact to='/kezilabda/'><i className="futbol outline icon large" /><h4 style={menuTitleStyle}> Kézilabda</h4></Menu.Item>
                <Menu.Item as={NavLink} exact to='/meccsek/'><Icon name="calendar" size="large"/><h4 style={menuTitleStyle}> Meccsek</h4></Menu.Item>
                <Menu.Menu position='right'>
                    { authMenuItem }
                </Menu.Menu>
            </Menu>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
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


class Navbar extends React.Component {
    render() {
        const authMenuItem =
            this.props.isLoggedIn ?
                <Dropdown trigger={<div><Icon name='settings'/> Adminisztráció</div>} className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} exact to='/bejegyzesek/uj'><Icon name='write' size="large"/> Új cikk</Dropdown.Item>
                        <Dropdown.Item as={NavLink} exact to='/statisztika'><Icon name='line chart' size="large"/> Statisztikák kezelése</Dropdown.Item>
                        <Dropdown.Item as={NavLink} exact to='/meccsek/'><Icon name="calendar"/> Meccsek kezelése</Dropdown.Item>
                        <Dropdown.Item as={NavLink} exact to='/galeria/'><Icon name="image"/> Galériák kezelése</Dropdown.Item>
                        <Dropdown.Item as={NavLink} exact to='/uj-jelszo/'><Icon name="key"/> Új jelszó</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            Cookies.remove('trdToken');
                            this.props.isAuthenticated(false);
                        }}><i className="white sign out alternate icon large"/>Kilépés</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> :
                <Menu.Item onClick={() => this.props.setOpen(true)}><i className='sign in alternate icon' />Belépés</Menu.Item>;

        return (

            <Menu stackable fluid inverted borderless color="teal" fixed="top">
                <Divider horizontal/>
                <Menu.Item as={NavLink} exact to='/'><Icon name='home'/>Kezdőlap</Menu.Item>
                <Menu.Item as={NavLink} exact to='/rolam'><Icon name="id badge"/>Rólam</Menu.Item>
                <Menu.Item as={NavLink} exact to='/en-igy-gondolom'><Icon name='idea'/>Én így gondolom</Menu.Item>
                <Menu.Item as={NavLink} exact to='/kezilabda'><i className="futbol outline icon"/>Kézilabda</Menu.Item>
                <Menu.Item as={NavLink} exact to='/meccsek'><Icon name="checked calendar"/>Meccsek</Menu.Item>
                <Menu.Item as={NavLink} exact to='/statisztika'><Icon name="line chart"/>Statisztika</Menu.Item>
                <Menu.Item as={NavLink} exact to='/galeria'><Icon name="file image outline"/>Galéria</Menu.Item>
                <Menu.Menu position='right'>
                    { authMenuItem }
                </Menu.Menu>
            </Menu>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
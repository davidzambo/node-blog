import React from 'react';
import {connect} from 'react-redux';
import {isAuthenticated, isLoginModalOpen} from "../../actions/auth";
import {setNavbarOpen} from "../../actions/navbar";
import {Divider, Icon, Menu} from 'semantic-ui-react';
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


class MobileNavbar extends React.Component {
    constructor(props){
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar(){
        this.props.setNavbarOpen(!this.props.active)    ;
    }

    render() {
        const authMenuItem =
            this.props.isLoggedIn ?

                    <div>
                        <Divider horizontal/>
                        <Menu.Item as={NavLink} to='#'><Icon name='settings' size="large"/> Adminisztráció</Menu.Item>
                        <Menu.Item as={NavLink} exact to='/bejegyzesek/uj'><Icon name='write' size="large"/> Új cikk</Menu.Item>
                        <Menu.Item as={NavLink} exact to='/statisztika'><Icon name='line chart' size="large"/> Statisztikák kezelése</Menu.Item>
                        <Menu.Item as={NavLink} exact to='/meccsek/'><Icon name="calendar" size="large"/> Meccsek kezelése</Menu.Item>
                        <Menu.Item as={NavLink} exact to='/galeria/'><Icon name="image" size="large"/> Galériák kezelése</Menu.Item>
                        <Menu.Item as={NavLink} exact to='/uj-jelszo/'><Icon name="key" size="large"/> Új jelszó</Menu.Item>
                        <Menu.Item onClick={() => {
                            Cookies.remove('trdToken');
                            this.props.isAuthenticated(false);
                        }}><Icon name="sign out" size="large"/>Kilépés</Menu.Item>
                    </div>
                 :
                <Menu.Item onClick={() => this.props.setOpen(true)}><Icon name="sign in" size="large"/>Belépés</Menu.Item>;

        return (

            <Menu fluid inverted borderless vertical color="teal" className="tablet-navbar" onClick={this.toggleNavbar}>
                <Menu.Item as={NavLink} exact to='/'><Icon name='home' size="large"/>Kezdőlap</Menu.Item>
                <Menu.Item as={NavLink} exact to='/rolam'><Icon name="id badge" size="large"/>Rólam</Menu.Item>
                <Menu.Item as={NavLink} exact to='/en-igy-gondolom'><Icon name='idea' size="large"/>Én így gondolom</Menu.Item>
                <Menu.Item as={NavLink} exact to='/kezilabda'><i className="futbol outline icon large"/>Kézilabda</Menu.Item>
                <Menu.Item as={NavLink} exact to='/meccsek'><Icon name="checked calendar" size="large"/>Meccsek</Menu.Item>
                <Menu.Item as={NavLink} exact to='/statisztika'><Icon name="line chart" size="large"/>Statisztika</Menu.Item>
                <Menu.Item as={NavLink} exact to='/galeria'><Icon name="file image outline" size="large"/>Galéria</Menu.Item>
                { authMenuItem }
            </Menu>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileNavbar));
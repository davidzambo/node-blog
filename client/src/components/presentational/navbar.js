import React from 'react';
import {connect} from 'react-redux';
import {isAuthenticated, isLoginModalOpen} from "../../actions/auth";
import {Grid, Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        setOpen: bool => dispatch(isLoginModalOpen(bool)),
        isAuthenticated: bool => dispatch(isAuthenticated(bool))
    }
}

class Navbar extends React.Component {

    handleOnClick(e, data) {
        this.props.setNavbar(data.id);
    }

    render() {
        console.log(this.props.isLoggedIn);
        if (this.props.isLoggedIn) {
            return (
                <Grid>
                    <Grid.Column width={16}>
                        <Menu fluid vertical tabular>
                            <Menu.Item><NavLink to='/'>Bejegyzések</NavLink></Menu.Item>
                            <Menu.Item><NavLink to='/uj'>Új bejegyzés</NavLink></Menu.Item>
                            <Menu.Item><NavLink to='/en-igy-gondolom'>Én így gondolom</NavLink></Menu.Item>
                            <Menu.Item><NavLink to='/kezilabda'>Kézilabda</NavLink></Menu.Item>
                            <Menu.Item><NavLink to='/statiszkikak'>Statisztikák</NavLink></Menu.Item>
                            <Menu.Item><NavLink to='/rolam'>Rólam</NavLink></Menu.Item>
                            <Menu.Item onClick={() => this.props.isAuthenticated(false)}>Kilépés</Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid>
            );

        } else {
            return (
                <Grid>
                    <Grid.Column width={16}>
                        <Menu fluid vertical tabular>
                            <Menu.Item><NavLink to='/'>Bejegyzések</NavLink></Menu.Item>
                            <Menu.Item><NavLink to='/en-igy-gondolom'>Én így gondolom</NavLink></Menu.Item>
                            <Menu.Item><NavLink to='/kezilabda'>Kézilabda</NavLink></Menu.Item>
                            <Menu.Item><NavLink to='/statiszkikak'>Statisztikák</NavLink></Menu.Item>
                            <Menu.Item><NavLink to='/rolam'>Rólam</NavLink></Menu.Item>
                            <Menu.Item onClick={() => this.props.setOpen(true)}>Belépés</Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
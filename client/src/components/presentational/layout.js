import React from 'react';
import Navbar from './navbar';
import MobileNavbar from './mobile-navbar';
import LoginModal from './login.modal';
import Archive from '../containers/archive';
import NewsLetter from '../containers/newsletter.js';
import {Container, Grid, Icon, Responsive, Sidebar} from 'semantic-ui-react';
import {setNavbarOpen} from "../../actions/navbar";
import {connect} from 'react-redux';
import Calendar from './calendar';
import Infobox from "./infobox";

const mapStateToProps = state => {
    return {
        isNavbarOpen: state.navbar.isNavbarOpen
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setNavbar: bool => dispatch(setNavbarOpen(bool))
    }
};

class Layout extends React.Component {
    constructor(props){
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar(){
        this.props.setNavbar(!this.props.isNavbarOpen);
    }

    render() {
        const isNavbarOpen = this.props.isNavbarOpen;
        return (
            <div style={{minHeight: '100%'}} className="page-content">
                <Responsive color="teal" maxWidth={Responsive.onlyTablet.maxWidth}>
                    <Container fluid>
                        <Grid padded>
                            <Grid.Row color="teal">
                                <Grid.Column width={16} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                                    <h3 style={{marginBottom: 0}}>Tóth Róbert Dávid</h3>
                                    <Icon name='sidebar' circular size="large" className="pointer" onClick={this.toggleNavbar}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Responsive>
                <Sidebar.Pushable>
                    <Sidebar.Pusher>
                        <Container fluid className="main-content">
                            <Grid centered padded>
                                <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                                    <Grid.Row color="teal">
                                        <Grid.Column>
                                            <Navbar/>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Responsive>
                                <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                                    <Sidebar animation='overlay' visible={isNavbarOpen} direction={'right'} size='very wide' style={{minWidth: '50vW', backgroundColor: "rgb(0, 181, 173)"}}>
                                        <MobileNavbar/>
                                    </Sidebar>
                                </Responsive>
                                <Grid.Row columns={2}>
                                    <Grid.Column mobile={16} tablet={12} computer={12} largeScreen={10} widescreen={10}>
                                        {this.props.children}
                                        <LoginModal/>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={4} computer={4} largeScreen={3} widescreen={2}>
                                        <Calendar/>
                                        <NewsLetter/>
                                        <Archive/>
                                        <Infobox/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                <div className="page-background"/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
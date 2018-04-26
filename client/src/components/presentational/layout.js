import React from 'react';
import Navbar from './navbar';
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
                <Container fluid>
                    <Grid style={{marginTop: 0}}>
                        <Responsive as={Grid.Row} color="teal" {...Responsive.onlyMobile}>
                            <Grid.Column width={16}>
                                <h4><Icon name='sidebar' size="large" onClick={this.toggleNavbar}/> TothRobertDavid.eu</h4>
                            </Grid.Column>
                        </Responsive>
                    </Grid>
                </Container>
                <Sidebar.Pushable>
                    <Responsive {...Responsive.onlyMobile}>
                        <Sidebar animation='overlay' visible={isNavbarOpen} direction={'left'}
                                 size='very wide'>
                            <Navbar/>
                        </Sidebar>
                    </Responsive>
                    <Sidebar.Pusher>
                        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                            <Container fluid>
                                <Grid style={{paddingTop: 80}}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Navbar/>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        </Responsive>
                        <Container fluid>
                            <Grid centered padded>
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
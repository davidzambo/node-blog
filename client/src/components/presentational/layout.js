import React from 'react';
import Navbar from './navbar';
import LoginModal from './login-modal';
import NewsLetter from '../containers/newsletter.js';
import {Container, Grid, Header, Sidebar, Sticky, Button} from 'semantic-ui-react';
import AdminNavbar from './admin-navbar';

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            isMenuOpen: false
        }
    }

    toggleMenu(){
        this.setState(prevState => {
            return {isMenuOpen: !prevState.isMenuOpen}
        });
    }

    render(){
        const {isMenuOpen} = this.state;
        return (
            <Container fluid>
                <Sidebar.Pushable>
                    <Sidebar animation='scale down' visible={isMenuOpen} direction={'left'}>
                        <Grid.Row>
                            <Grid.Column stretched>
                                <Navbar/>
                            </Grid.Column>
                        </Grid.Row>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Grid padded>
                            <Grid.Row>
                                <Grid.Column width={13}>
                                    <Header as="h1" textAlign="center">
                                        {' '} Tóth Róbert Dávid
                                    </Header>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Button icon={'content'} primary floated={'right'} onClick={this.toggleMenu}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                    {this.props.children}
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <AdminNavbar/>
                                    <NewsLetter/>
                                </Grid.Column>
                                <LoginModal/>
                            </Grid.Row>
                        </Grid>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Container>
        );
    }
}
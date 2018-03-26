import React from 'react';
import Navbar from './navbar';
import LoginModal from './login-modal';
import NewsLetter from '../containers/newsletter.js';
import {Grid, Header } from 'semantic-ui-react';
import AdminNavbar from './admin-navbar';

const Layout = (props) => {
    return (
        <Grid padded relaxed>
            <Grid.Column width={16}>
                <Header as="h1" textAlign="center">
                    {' '} Tóth Róbert Dávid
                </Header>
            </Grid.Column>
            <Grid.Column width={16}>
                <Navbar/>
            </Grid.Column>
            <Grid.Column width={11}>

                {props.children}

            </Grid.Column>
            <Grid.Column width={5}>
                <AdminNavbar />
                <NewsLetter />
            </Grid.Column>
            <LoginModal/>
        </Grid>
    );
}

export default Layout;
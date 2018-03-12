import React from 'react';
import Navbar from './Navbar';
import { Container, Grid, Header } from 'semantic-ui-react';

const Layout = (props) => {
  return (
      <Grid padded relaxed>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h1" textAlign="center">
              {' '} Tóth Róbert Dávid
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Navbar />
          </Grid.Column>
          <Grid.Column width={12}>
         
            { props.children }
         
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
}

export default Layout;
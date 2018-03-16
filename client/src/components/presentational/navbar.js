import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {

  handleOnClick(e, data){
    this.props.setNavbar(data.id);
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={16}>
          <Menu fluid vertical tabular>
            <Menu.Item><NavLink to='/'>Bejegyzések</NavLink></Menu.Item>
            <Menu.Item><NavLink to='/en-igy-gondolom'>Én így gondolom</NavLink></Menu.Item>
            <Menu.Item><NavLink to='/kezilabda'>Kézilabda</NavLink></Menu.Item>
            <Menu.Item><NavLink to='/statiszkikak'>Statisztikák</NavLink></Menu.Item>
            <Menu.Item><NavLink to='/rolam'>Rólam</NavLink></Menu.Item>

          
          </Menu>
          
          
          
          
          
        </Grid.Column>
      </Grid>
    );
  }
}

export default Navbar;
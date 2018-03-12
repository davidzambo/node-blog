import React from 'react';
import { connect } from "react-redux";
import setNavbar from "../actions/navbar";
import { Grid, Menu, Accordion } from 'semantic-ui-react';

const mapDispatchToProps = dispatch => {
  return {
    setNavbar: menu => dispatch(setNavbar(menu))
  }
}

const mapStateToProps = state => {
  return { navbar: state.navbar };
}

class ConnectedNavbar extends React.Component {

  handleOnClick(e, data){
    this.props.setNavbar(data.id);
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={16}>
          <Menu fluid vertical tabular>
            <Menu.Item name="Új cikk" id="new_article" active={this.props.navbar === 'new_article'} onClick={this.handleOnClick.bind(this)}/>
            <Menu.Item name="Cikkek" id="articles" active={this.props.navbar === 'articles'} onClick={this.handleOnClick.bind(this)}/>
            <Menu.Item name="Rólam" id="about" active={this.props.navbar === 'about'} onClick={this.handleOnClick.bind(this)}/>
          </Menu>
        </Grid.Column>
      </Grid>
    );
  }
}

const Navbar = connect(mapStateToProps, mapDispatchToProps)(ConnectedNavbar);

export default Navbar;
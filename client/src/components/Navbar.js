import React from 'react';
import { connect } from "react-redux";
import setNavbar from "../actions/navbar";
import { Grid, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
          <Link to="/articles/">
            <Menu.Item 
              name="Új cikk" 
              id="new_article" 
              active={this.props.navbar === 'new_article'} 
              onClick={this.handleOnClick.bind(this)} />
            </Link>
            <Link to="/articles">
              <Menu.Item 
                name="Cikkek" 
                id="articles" 
                active={this.props.navbar === 'articles'} 
                onClick={this.handleOnClick.bind(this)}/>
            </Link>
            <Link to="/vala">
              <Menu.Item 
              name="Rólam" 
              id="about" 
              active={this.props.navbar === 'about'} 
              onClick={this.handleOnClick.bind(this)}/>
            </Link>
          </Menu>
        </Grid.Column>
      </Grid>
    );
  }
}

const Navbar = connect(mapStateToProps, mapDispatchToProps)(ConnectedNavbar);

export default Navbar;
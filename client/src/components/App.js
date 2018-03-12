import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import Layout from './Layout';
import Editor from './Editor';
import Articles from './Articles';

const mapStateToProps = state => {
  return {page: state.navbar};
}


class ConnectedApp extends Component {
  render() {
    switch (this.props.page){
      case 'new_article':
        return (
          <Layout>
            <Editor />            
          </Layout>
        );
      
      case 'articles':
        return (
          <Layout>
            <Articles />
          </Layout>
        );

      default:
        return (
          <Layout>
            <h1>Rólam</h1>
          </Layout>

        )
    }
  }
}

const App = connect(mapStateToProps)(ConnectedApp);

export default App;
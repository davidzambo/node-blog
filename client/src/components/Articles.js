import React, { Component } from "react";
import { connect } from "react-redux";
import { postsFetchData } from "../actions/posts";
import Article from './Article';
import Layout from './Layout';
import ConfirmDeletePostModal from './ConfirmDeletePostModal';

const mapStateToProps = state => {
  return { 
    posts: state.posts.posts,
    hasErrored: state.posts.hasErrored,
    isLoading: state.posts.isLoading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(postsFetchData())
  };
}

class ConnectedArticles extends Component {
  
  componentDidMount(){
    this.props.fetchData();
  }

  render() {
    if (this.props.hasErrored){
      return <p>Para</p>
    }
    if (this.props.isLoading){
      return <p>Loading</p>
    }

    return (
      <Layout>
        {this.props.posts.map( (post) => {
          
          return <Article post={post} key={post._id}/>

        })}

        <ConfirmDeletePostModal/>
        
      </Layout>
    );
  }
}

const Articles = connect(mapStateToProps, mapDispatchToProps)(ConnectedArticles);

export default Articles;
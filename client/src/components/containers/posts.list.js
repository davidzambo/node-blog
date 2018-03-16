import React, { Component } from "react";
import axios from 'axios';
import Post from '../presentational/post';
import Layout from '../presentational/layout';
import ConfirmDeletePostModal from '../presentational/confirm-delete-post-modal';



class PostList extends Component {
  constructor(props){
    super(props);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.state = {
      page: 1,
      posts: [],
    }
  }
  
  componentWillMount(){
    this.fetchPosts(this.props);
  }

  componentWillReceiveProps(nextProps, nextState){
    this.fetchPosts(nextProps);
  }

  fetchPosts(props){
    let url = '/api/posts/';
    if (props.match.params.category === 'kezilabda') {
      url = '/api/category/handball';
    } else if (props.match.params.category === 'en-igy-gondolom') {
      url = '/api/category/personal';
    }

    axios.get(url)
      .then(response => {
        this.setState({ page: 1, posts: response.data.posts, })
      });
  }

  render() {
    const { page, posts } = this.state;
    return (
      <Layout>
        {posts.map( (post) => {        
          return <Post post={post} key={post._id}/>
        })}
        <ConfirmDeletePostModal/>
      </Layout>
    );
  }
}

export default PostList;
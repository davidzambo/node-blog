import React, { Component } from "react";
import { connect } from "react-redux";
import { destroyPost } from "../actions/actions";

const mapStateToProps = state => {
  return { posts: state.posts };
}

const mapDispatchToProps = dispatch =>{
  return {
    destroyPost: post => dispatch(destroyPost(post))
  };
}

class ConnectedList extends Component {
  handleRemove(e){
    const article = e.target.textContent;
    const id = e.target.id;
    this.props.removeArticle({ article, id})
  }

  render(){
    return(
      <div>
        {this.props.posts.map( el => (
          <article key={el.id}>
            <h1>{el.title}</h1>
            <h3>{el.tagsArray.join('')}</h3>
            <hr/>
            <div>{el.body}</div>
          </article>
        ))}
      </div>
    );
  }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;
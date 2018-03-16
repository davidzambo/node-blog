import React, { Component } from "react";
import { connect } from "react-redux";
import { postToHandle, isConfirmDeletePostModalOpen, editPost } from "../../actions/posts";
import { Divider, Button, Label } from "semantic-ui-react";
import Parser from 'html-react-parser';


const mapDispatchToProps = dispatch => {
  return {
    postToHandle: (post) => dispatch(postToHandle(post)),
    isConfirmDeletePostModalOpen: (bool) => dispatch(isConfirmDeletePostModalOpen(bool)),
    editPost: (post) => dispatch(editPost(post))
  };
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete() {
    this.props.postToHandle(this.props.post);
    this.props.isConfirmDeletePostModalOpen(true);
  }

  handleEdit() {
    this.props.editPost(this.props.post);
  }

  render() {
    const { post } = this.props;

    return (
      <article key={post._id}>
        <h1><a href={'/bejegyzesek/' + post.slug}>{post.title}</a></h1>
        <p><small>{post.date}</small></p>
        <Divider horizontal />
        {Parser(post.body)}
        {post.tags.map((tag, i) => { return <Label key={i}>{tag}</Label> })}
        <Divider horizontal />
        <Button color='orange' size='tiny' content="szerkesztés" onClick={this.handleEdit} />
        <Button color='red' size='tiny' content="törlés" onClick={this.handleDelete} />
        <Divider section horizontal/>
      </article>
    );
  }

}

export default connect(null, mapDispatchToProps)(Post);
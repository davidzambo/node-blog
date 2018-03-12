import React, {Component} from "react";
import { connect } from 'react-redux';
import { createPost } from "../redux/actions";
import {Form, Button, Divider} from 'semantic-ui-react';

const mapDispatchToProps = dispatch => {
  return{
    createPost: post => dispatch(createPost(post))
  };
}

class ConnectedNewArticleFormForm extends Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: '',
      tags: [],
      body: '',
    }
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const { title, tagsString, body } = this.state;
    const id = uuidv1();
    const tags = tagsString.split(' ');
    const created_at = new Date();
    this.props.createPost({title, tags, body, created_at, id});
    this.setState({ title: '', body: '', tagsString: ''});
  }

  render(){
    const { title, tagsString, body } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input label="Cím:" id="title" value={title} onChange={this.handleChange}/>
        <Form.Input label="Cimkék:" id="tagsString" value={tagsString} onChange={this.handleChange} />
        <TextArea label="Cikk:" id="body" value={body} onChange={this.handleChange} />

        <Button content="mentés" color="blue" />
      </Form>
    );
  }
}

const NewArticleForm = connect(null, mapDispatchToProps)(ConnectedNewArticleFormForm);

export default NewArticleForm;
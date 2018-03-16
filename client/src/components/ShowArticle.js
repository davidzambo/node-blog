import React, { Component } from "react";
import { connect } from "react-redux";
import { postToHandle, isConfirmDeletePostModalOpen, editPost } from "../actions/posts";
import Layout from './Layout';
import { Divider, Button, Label } from "semantic-ui-react";
import axios from 'axios';
import Parser from 'html-react-parser';

const mapDispatchToProps = dispatch => {
    return {
        postToHandle: (post) => dispatch(postToHandle(post)),
        isConfirmDeletePostModalOpen: (bool) => dispatch(isConfirmDeletePostModalOpen(bool)),
        editPost: (post) => dispatch(editPost(post))
    };
}

class ConnectedArticle extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.state = {
            post: {
                _id: '',
                title: '',
                tags: [],
                body: '',
                date: ''
            }
        }
    }


    componentWillMount(){
        console.log(this.props);
        axios.get('/api/posts/'+this.props.match.params.slug)
            .then( response => {
                console.log(response);
                if (response.data.post !== null){
                    this.setState({post: response.data.post})
                } else {
                    const noPost = Object.assign({}, this.state.post);
                    noPost.title = 'Whoops!';
                    noPost.body = 'Sajnos nem találjuk a keresett oldalt! :/';
                    this.setState({ post: noPost })
                }
            });
    }

    handleDelete() {
        this.props.postToHandle(this.props.post);
        this.props.isConfirmDeletePostModalOpen(true);
    }

    handleEdit() {
        this.props.editPost(this.props.post);
    }

    render() {
        const { post } = this.state;

        return (
            <Layout>
                <article key={post._id}>
                    <h1>{post.title}</h1>
                    <p><small>{post.date}</small></p>
                    <Divider horizontal />
                    { Parser(post.body) }}
                    {post.tags.map((tag, i) => { return <Label key={i}>{tag}</Label> })}
                    <Divider horizontal />
                    <Button color='orange' size='tiny' content="szerkesztés" onClick={this.handleEdit} />
                    <Button color='red' size='tiny' content="törlés" onClick={this.handleDelete} />
                </article>
            </Layout>
        );
    }
}


export default connect(null, mapDispatchToProps)(ConnectedArticle);
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { postToHandle, isConfirmDeletePostModalOpen, editPost } from "../../actions/posts";
import Layout from '../presentational/layout';
import Post from '../presentational/post';

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


    componentWillMount() {
        console.log(this.props);
        axios.get('/api/posts/' + this.props.match.params.slug)
            .then(response => {
                console.log(response);
                if (response.data.post !== null) {
                    this.setState({ post: response.data.post })
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
                <Post post={post} />
            </Layout>
        );
    }
}


export default connect(null, mapDispatchToProps)(ConnectedArticle);
import React, { Component } from "react";
import axios from 'axios';
import Layout from '../presentational/layout';
import Post from '../presentational/post';
import ConfirmModal from "../presentational/confirm-modal";


export class PostShow extends Component {
    constructor(props) {
        super(props);
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

    componentDidMount() {
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

    render() {
        const { post } = this.state;

        return (
            <Layout>
                <Post details={post} />
                <ConfirmModal/>
            </Layout>
        );
    }
}


export default PostShow;
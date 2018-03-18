import React, {Component} from "react";
import axios from 'axios';
import Post from '../presentational/post';
import Layout from '../presentational/layout';
import ConfirmDeletePostModal from '../presentational/confirm-delete-post-modal';
import Pagination from '../presentational/paginatior';


class PostList extends Component {
    constructor(props) {
        super(props);
        this.fetchPosts = this.fetchPosts.bind(this);
        this.state = {
            posts: [],
        }
    }

    componentWillMount() {
        this.fetchPosts(this.props);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.fetchPosts(nextProps);
    }

    fetchPosts(props) {
        const page = '' || props.match.params.page;
        let url = '/api/posts/page/' + page;
        if (props.match.params.category === 'kezilabda') {
            url = '/api/category/handball/' + page;
        } else if (props.match.params.category === 'en-igy-gondolom') {
            url = '/api/category/personal/' + page;
        }

        axios.get(url)
            .then(response => {
                this.setState({page: 1, posts: response.data.posts,})
            });
    }

    render() {
        console.log(this.props);
        const {posts} = this.state;
        return (
            <Layout>
                {posts.map((post) => {
                    return <Post post={post} key={post._id}/>
                })}
                <ConfirmDeletePostModal {...this.props}/>
                <Pagination
                    current={this.props.match.params.page}
                    listedPosts={this.state.posts.length}/>
            </Layout>
        );
    }
}

export default PostList;
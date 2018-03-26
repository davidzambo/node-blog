import React, {Component} from "react";
import axios from 'axios';
import Post from '../presentational/post';
import Layout from '../presentational/layout';
import ConfirmDeletePostModal from '../presentational/confirm-delete-post-modal';
import Paginatior from '../presentational/paginatior';


class PostList extends Component {
    constructor(props) {
        super(props);
        this.fetchPosts = this.fetchPosts.bind(this);
        this.state = {
            posts: [],
            page: 1,
            hasNext: true
        }
    }

    componentWillMount() {
        this.fetchPosts(this.props);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.fetchPosts(nextProps);
    }

    fetchPosts(props) {
        const queryArray = props.location.search.slice(1).split('&');
        const queryObj = {};

        queryArray.map( function(query) {
            const splittedQuery = query.split('=');
            queryObj[splittedQuery[0]] = splittedQuery[1];
            return true;
        });

        const page = (queryObj.oldal === undefined || queryObj.oldal < 2 ) ? 1 : queryObj.oldal;

        let url = '/api/posts/?page=' + page;
        if (props.match.params.category === 'kezilabda') {
            url = '/api/posts/?category=handball&page=' + page;
        } else if (props.match.params.category === 'en-igy-gondolom') {
            url = '/api/posts/?category=personal&page=' + page;
        }

        axios.get(url)
            .then(response => {
                console.log(response.data);
                const {count, page, limit} = response.data;
                const hasNext = count > (page) * limit;
                this.setState({
                    posts: response.data.posts,
                    page: page,
                    hasNext: hasNext,
                })
            });
    }

    render() {
        const {posts} = this.state;
        return (
            <Layout>
                {posts.map((post) => {
                    return <Post post={post} key={post._id}/>
                })}
                <ConfirmDeletePostModal {...this.props}/>
                <Paginatior
                    current={Number(this.state.page)}
                    hasNext={this.state.hasNext}/>
            </Layout>
        );
    }
}

export default PostList;
import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {editPost, isConfirmDeletePostModalOpen, postToHandle} from "../../actions/posts";
import {Button, Divider, Header, Icon, Label, Segment} from "semantic-ui-react";
import Parser from 'html-react-parser';
import moment from 'moment';
import 'moment/locale/hu';


const mapStateToProps = state => {
    return {isAuthenticated: state.auth.isAuthenticated}
}

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
        const {post} = this.props;

        return (
            <Segment as='article' key={post._id}>
                <Header as='h1'><a href={'/bejegyzesek/' + post.slug}>{post.title}</a></Header>
                <Header as='h5' textAlign='left'>{moment(post.date, 'hu').format('YYYY. MMMM D. HH:MM')}</Header>
                <Divider horizontal/>
                {Parser(post.body)}
                {post.tags.map((tag, i) => {
                    return <Label key={i}>{tag}</Label>
                })}
                <Divider horizontal/>
                {this.props.isAuthenticated ?
                    <div>
                        <Link
                            to={`/bejegyzesek/${post.slug}/szerkesztes`}
                            className='ui orange button'
                            onClick={this.handleEdit}
                            floated='right'>
                        <Icon name='edit'/>szerkesztés
                        </Link>
                        <Button
                            color='red'
                            icon='trash'
                            content='törlés'
                            labelPosition='left'
                            floated='left'
                            onClick={this.handleDelete}/>
                    </div> :
                    ''
                }
            </Segment>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
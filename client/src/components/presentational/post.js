import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Button, Divider, Header, Label, Segment} from "semantic-ui-react";
import Parser from 'html-react-parser';
import moment from 'moment';
import 'moment/locale/hu';
import {setEntity, resetConfirm, setHeader, setOnCancel, setOnConfirm, setOpen, setQuestion} from "../../actions/confirm";
import axios from "axios";

const mapStateToProps = state => {
    return {isAuthenticated: state.auth.isAuthenticated}
}

const mapDispatchToProps = dispatch => {
    return {
        setOpen: bool => dispatch(setOpen(bool)),
        setEntity: obj => dispatch(setEntity(obj)),
        setQuestion: question => dispatch(setQuestion(question)),
        setHeader: header => dispatch(setHeader(header)),
        setOnConfirm: func => dispatch(setOnConfirm(func)),
        setOnCancel: func => dispatch(setOnCancel(func)),
        resetConfirm: () => dispatch(resetConfirm()),
    };
};

export class Post extends Component {
    handleDelete() {
        const post = this.props.details;
        this.props.setEntity(post);
        this.props.setQuestion(`Biztosan törölni szeretné a(z) <h3>${post.title}</h3> című posztot?`);
        this.props.setHeader('Bejegyzés törlése');
        this.props.setOnConfirm(() => {
           axios({
               url: '/api/posts/',
               method: 'delete',
               data: post
           })
               .then( response => {
                   if (response.status === 200) {
                       this.props.resetConfirm();
                   }
               });
        });
        this.props.setOnCancel(() => {
            this.props.resetConfirm();
        })
        this.props.setOpen(true);
    }

    render() {
        const post = this.props.details;

        return (
            <Segment as='article' key={post._id}>
                <Header as='h1'><a href={'/bejegyzesek/' + post.slug}>{post.title}</a></Header>
                <Header as='h5' textAlign='left'>{post.date && moment(post.date).locale('hu').format('YYYY. MMMM Do HH:mm')}</Header>
                <Divider horizontal/>
                {Parser(post.body)}
                {post.tags.map((tag, i) => {
                    return <Label key={i}>{tag}</Label>
                })}
                <Divider horizontal/>
                {(this.props.isAuthenticated && post.date) ?
                    <div>
                        <Button
                            as={Link}
                            to={`/bejegyzesek/${post.slug}/szerkesztes`}
                            color='orange'
                            icon='edit'
                            content='szerkesztés'
                            labelPosition='left'/>
                        <Button
                            color='red'
                            icon='trash'
                            content='törlés'
                            labelPosition='left'
                            onClick={() => this.handleDelete() }/>
                    </div> :
                    ''
                }
            </Segment>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
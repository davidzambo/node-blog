import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import { cancelPostAction } from "../../actions/posts";
import { Form, Button, Divider, Header } from 'semantic-ui-react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import Layout from '../presentational/layout';
Quill.register('modules/ImageResize', ImageResize);

const mapStateToProps = state => {
    if (state.posts.postToHandle.title === undefined)
        return { title: '', tags: '', category: '', body: '' }
    return {
        _id: state.posts.postToHandle._id,
        title: state.posts.postToHandle.title,
        tags: state.posts.postToHandle.tags.join('+'),
        category: state.posts.postToHandle.category,
        body: state.posts.postToHandle.body,
        isEdit: state.posts.isEdit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cancelPostAction: () => dispatch(cancelPostAction())
    };
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
    ImageResize: {}
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const categories = [
    { key: 'personal', text: 'Én így gondolom', value: 'personal' },
    { key: 'handball', text: 'Kézilabda', value: 'handball' }
]


/**
 *  check validation rules
 */
const validator = (rule, inputToTest) => {

    const rules = {
        title: /^[\W\w]{2,}$/gi,
        tags: /^[\W\w]{2,}$/gi,
        category: /(personal|handball)/,
        body: /^[\W\w]{10,}$/gi,
    }

    return rules[rule].test(inputToTest);
}

class ConnectedPostEditor extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: '',
            tags: '',
            body: '',
            category: ''
        }
    }

    componentDidMount() {
        if (this.props.isEdit)
            this.setState(this.props);
    }

    handleChange(e) {
        // check if Quill's value had been passed
        if (e.hasOwnProperty('target'))
            this.setState({ [e.target.id]: e.target.value });
        else
            this.setState({ body: e });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { title, tags, body, category } = this.state;
        if (validator('title', title) &&
            validator('tags', tags) &&
            validator('body', body) &&
            validator('category', category)) {
            if (this.props.isEdit){
                axios.put('/api/posts/'+this.state._id, this.state)
                    .then( response => {
                       if (response.status !== 200) {
                           console.error(response.statusText);
                       } else {
                           this.props.cancelPostAction();
                       }
                    })
                    .then( () => this.props.history.push('/'));
            } else {
                axios.post('/api/posts', this.state)
                    .then( response => {
                        if (response.status !== 200) {
                            console.error(response.statusText);
                        } else {
                            this.props.cancelPostAction();
                        }
                    })
                    .then( () => this.props.history.push('/'));
            }
        } else {
            alert('Kérem ellenőrizze a megadott adatokat. Minden mezőt kitöltött?');
        }
    }

    render() {
        const { title, tags, body, category } = this.state;
        let button = <Button type="submit" color="blue">mentés</Button>
        if (this.props.update) {
            button = <div>
                <Button type="button" color='blue' onClick={this.props.cancelPostAction}>mégsem</Button>'
                <Button type="submit" color="orange">frissítés</Button>
              </div>
        }
        return (
            <Layout>
                <Header content='Új bejegyzés szerkesztése' />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input label="Cím:"
                            id="title"
                            value={title}
                            onChange={this.handleChange}
                            width={16} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Cimkék:"
                            id="tags"
                            value={tags}
                            onChange={this.handleChange}
                            width={10} />
                        <Form.Select label='Kategória'
                            id='category'
                            value={category}
                            options={categories}
                            onChange={(e, { value }) => this.setState({ category: value })}
                            placeholder="Kategória"
                            width={6} />
                    </Form.Group>
                    <ReactQuill label="Cikk:"
                        id="body"
                        value={body}
                        modules={modules}
                        formats={formats}
                        onChange={this.handleChange} />
                    <Divider horizontal />
                    {button}
                </Form>
            </Layout>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedPostEditor));
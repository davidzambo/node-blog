import React, { Component } from "react";
import { connect } from 'react-redux';
import { createPost, updatePost, cancelPostAction } from "../../actions/posts";
import { Form, Button, Divider } from 'semantic-ui-react';
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
        addPost: post => dispatch(createPost(post)),
        updatePost: post => dispatch(updatePost(post)),
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
    constructor() {
        super();
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
        this.setState(this.props)
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
            if (this.props.isEdit)
                this.props.updatePost(this.state)
            else
                this.props.addPost(this.state);
            // this.setState({ title: '', body: '', tags: '', category: '' });
        } else {
            alert('Kérem ellenőrizze a megadott adatokat. Minden mezőt kitöltött?');
        }
    }

    render() {
        const { title, tags, body, category } = this.state;
        let button = <Button type="submit" color="blue">mentés</Button>
        if (this.props.isEdit) {
            button = <div>
                <Button type="submit" color="orange">frissítés</Button>
                <Button type="button" color='blue' onClick={this.props.cancelPostAction}>mégsem</Button>'
              </div>
        }
        return (
            <Layout>
                <Form onSubmit={this.handleSubmit} action='/api/posts/create' method='post'>
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
                            width={9} />
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

const PostEditor = connect(mapStateToProps, mapDispatchToProps)(ConnectedPostEditor);

export default PostEditor;
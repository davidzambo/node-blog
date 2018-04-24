import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import axios from 'axios';

export default class GalleryUploader extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            gallery: '',
            description: '',
            files: []
        }
    }

    handleOnChange(e) {
        if (e.target.id === 'files') {
            let data = Array.from(e.target.files);
            this.setState({files: data}, () => console.log(this.state));
        } else {
            this.setState({[e.target.id]: e.target.value});
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(),
            {files, gallery} = this.state;
        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }

        data.append('gallery', gallery);
        axios({
            url: '/api/gallery',
            data: data,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        }).then(response => {
            console.log(response.data);
        })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input label="Album neve"
                            id="gallery"
                            value={this.state.value}
                            onChange={this.handleOnChange}
                            error={!/\w{1,}/.test(this.state.gallery)}/>
                <Form.Input label="Album leírása" id="description" value={this.state.value} onChange={this.handleOnChange}/>
                <Form.Field>
                    <Button icon="search" type="button" color="blue" className="d-inline-block" content="Képek kiválasztása" htmlFor="files" as="label" style={{color: 'white', display: 'inline-block', marginRight: '1rem', height: 37}}/>
                        <input type="file" multi id="files" className="d-none" onChange={this.handleOnChange}/>
                    <Button positive icon="upload" type="submit" content="Feltöltés" className="d-inline"/>
                </Form.Field>
            </Form>
        );
    }
}
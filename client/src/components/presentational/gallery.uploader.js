import React from 'react';
import {Form} from 'semantic-ui-react';
import axios from 'axios';

export default class GalleryUploader extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            album: '',
            files: []
        }
    }

    handleOnChange(e) {
        if (e.target.id === 'files') {
            console.log('ez egy file');
            let data = Array.from(e.target.files);
            this.setState({files: data}, () => console.log(this.state));
        } else {
            this.setState({[e.target.id]: e.target.value});
        }
        console.log('if után');
        console.log(this.state);
    }


    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(),
            {files, album} = this.state;
        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }

        data.append('album', album);
        console.log(data);
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
                <Form.Input label="Album neve" id="album" value={this.state.value} onChange={this.handleOnChange}/>
                <Form.Input label="Fájl kiválasztása" type="file" id="files" multiple={true}
                            onChange={this.handleOnChange}/>
                <Form.Button type="submit" content="Feltöltés"/>
            </Form>
        );
    }
}
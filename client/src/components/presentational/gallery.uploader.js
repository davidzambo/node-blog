import React from 'react';
import {Form, Button, Segment, Header} from 'semantic-ui-react';
import axios from 'axios';
import Validator from "../../libs/validators";
import {connect} from "react-redux";
import {setGalleries} from "../../actions/gallery";
const validator = new Validator();

const mapDispatchToProps = dispatch => {
    return {
        setGalleries: galleries => dispatch(setGalleries(galleries)),
    }
};

class GalleryUploader extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: '',
            description: '',
            files: []
        }
    }

    componentDidMount(){
        console.log(this.props);
        if (this.props.update) {
            this.setState({
                title: this.props.details.title
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.update){
            this.setState({
                _id: nextProps.details._id,
                title: nextProps.details.title,
                description: nextProps.details.description
            });
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
        if (validator.isTitle(this.state.title && this.state.files > 0)) {
            this.setState({isLoading: true});
            const data = new FormData(),
                {files, description, title} = this.state;
            for (let i = 0; i < files.length; i++) {
                data.append('files', files[i]);
            }

            data.append('title', title);
            data.append('description', description);

            if (this.props.update){
                data.append('_id', this.state._id);
            }

            axios({
                url: '/api/gallery',
                data: data,
                method: this.props.update ? 'put' : 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }).then(response => {
                if (this.props.update){
                    window.history.back();
                } else {
                    this.props.setGalleries(response.data.galleries);
                    this.setState({
                        title: '',
                        description: '',
                        files: [],
                        isLoading: false});
                }
            })
        }
    }

    render() {
        return (
            <Segment secondary>
                <Header as="h3" content="Új galéria feltöltése"/>
                <Form onSubmit={this.handleSubmit} error>
                    <Form.Input label="Album neve"
                                id="title"
                                value={this.state.title}
                                onChange={this.handleOnChange}
                                error={(this.state.title !== '' && !validator.isTitle((this.state.title)))}/>
                    <Form.Input label="Album leírása"
                                id="description"
                                value={this.state.description}
                                onChange={this.handleOnChange}/>
                    <Form.Field>
                        <Button icon="search"
                                type="button"
                                color="blue"
                                className="d-inline-block"
                                content={this.state.files.length > 0 ? `${this.state.files.length} kép kiválasztva` : "Képek kiválasztása"}
                                htmlFor="files"
                                as="label"
                                style={{color: 'white', display: 'inline-block', marginRight: '1rem', height: 37}}/>
                        <input type="file" multiple id="files" className="d-none" onChange={this.handleOnChange}/>

                        {(this.state.files[0] || this.props.update) && <Button positive
                                                        icon="upload"
                                                        type="submit"
                                                        content={this.props.update ? "Frissítés" : "Feltöltés"}
                                                        loading={this.state.isLoading}
                                                        className="d-inline"/>}
                    </Form.Field>
                </Form>
            </Segment>
        );
    }
}

export default connect(null, mapDispatchToProps)(GalleryUploader);
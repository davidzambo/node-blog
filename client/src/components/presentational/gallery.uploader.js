import React from 'react';
import {Form, Button, Segment, Header, Message} from 'semantic-ui-react';
import axios from 'axios';
import Validator from "../../libs/validators";
import {connect} from "react-redux";
import {setGalleries} from "../../actions/gallery";

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
            files: [],
            result: ''
        }
    }

    componentDidMount(){
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
            this.setState({files: data});
        } else {
            this.setState({[e.target.id]: e.target.value});
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        if (Validator.isTitle(this.state.title) && (this.state.files.length > 0 || this.props.update)) {
            console.log('elindul');
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
                this.props.setGalleries(response.data.galleries);
                this.setState({
                    title: '',
                    description: '',
                    files: [],
                    isLoading: false,
                    result: <Message icon="check" positive header="Gratulálunk!" content={response.data.message}/>
                });
            }).catch( error => this.setState({result: <Message icon="exclamation circle" negative header="Whoops" content={error.response.data.message}/>, isLoading: false}));
        }
    }

    render() {
        const {update} = this.props;
        return (
            <Segment>
                <Header as="h3" content={ update ? "Galéria frissítése" :  "Új galéria feltöltése"}/>
                <Form onSubmit={this.handleSubmit} error>
                    <Form.Input label="Album neve"
                                id="title"
                                value={this.state.title}
                                onChange={this.handleOnChange}
                                error={(this.state.title !== '' && !Validator.isTitle((this.state.title)))}
                                required/>
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
                        <input type="file" multiple id="files" className="d-none" onChange={this.handleOnChange} accept="image/x-png,image/gif,image/jpeg"/>

                        {(this.state.files[0] || update) && <Button positive
                                                        icon="upload"
                                                        type="submit"
                                                        content={this.props.update ? "Frissítés" : "Feltöltés"}
                                                        loading={this.state.isLoading}
                                                        className="d-inline"/>}
                    </Form.Field>
                    {this.state.result}
                </Form>
            </Segment>
        );
    }
}

export default connect(null, mapDispatchToProps)(GalleryUploader);
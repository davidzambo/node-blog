import React from 'react';
import {connect} from 'react-redux';
import Layout from '../presentational/layout';
import GalleryUploader from "../presentational/gallery.uploader";
import axios from 'axios';
import {Gallery} from "../presentational/gallery";
import {Card} from "semantic-ui-react";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

class GalleryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            galleries: [],
        }
    }

    async componentDidMount(){
        try{
            const response = await axios.get('/api/gallery');
            this.setState({ galleries: response.data.galleries });
        } catch(err) {
            console.log(err);
        }
    }

    render(){
        return (
            <Layout>
                <h1>Galéria</h1>
                <Card.Group itemsPerRow={3}>
                    {this.state.galleries.map(gallery => {
                        return <Gallery details={gallery} key={gallery._id}/>
                    })}
                </Card.Group>
                <GalleryUploader/>
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(GalleryList);
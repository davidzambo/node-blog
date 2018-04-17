import React from 'react';
import {connect} from 'react-redux';
import Layout from '../presentational/layout';
import GalleryUploader from "../presentational/gallery.uploader";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

class Gallery extends React.Component{
    render(){
        return (
            <Layout>
                <h1>Galéria</h1>
                <GalleryUploader/>
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(Gallery);
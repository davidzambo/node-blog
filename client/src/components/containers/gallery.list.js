import React from 'react';
import {connect} from 'react-redux';
import Layout from '../presentational/layout';
import GalleryUploader from "../presentational/gallery.uploader";
import axios from 'axios';
import Gallery from "../presentational/gallery";
import {Segment, Divider, Header, Icon} from "semantic-ui-react";
import {setGalleries} from "../../actions/gallery";
import ConfirmModal from "../presentational/confirm-modal";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        galleries: state.gallery.galleries
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setGalleries: galleries => dispatch(setGalleries(galleries))

    }
};

class GalleryList extends React.Component{
    async componentDidMount(){
        try{
            const response = await axios.get('/api/gallery');
            this.props.setGalleries(response.data.galleries);
        } catch(err) {
            console.log(err);
        }
    }

    render(){
        return (
            <Layout>
                <Segment raised padded>
                    <Header as="h1">
                        <Icon name="file image outline"/>
                        <Header.Content>
                            Galéria
                        </Header.Content>
                    </Header>
                    <Divider horizontal/>
                    <Segment.Group>
                        {this.props.galleries.map(gallery => {
                            return <Gallery details={gallery} key={gallery._id}/>
                        })}
                    </Segment.Group>
                    {this.props.isAuthenticated && <div>
                        <GalleryUploader/>
                        <ConfirmModal />
                    </div>}
                </Segment>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryList);
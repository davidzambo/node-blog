import React from 'react';
import axios from 'axios';
import {Card, Image, Icon} from 'semantic-ui-react';
import Layout from "../presentational/layout";
import ConfirmModal from "../presentational/confirm-modal";

export class GalleryEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gallery: {
                title: '',
                images: []
            }
        }
    }

    async componentDidMount(){
        const response = await axios.get('/api/gallery', {
            params: {
                slug: this.props.match.params.slug
            }
        });

        this.setState({
            gallery: response.data.galleries[0]
        });
        console.log(response.data);
    }

    render(){
        return(
            <Layout>
                <h1>{this.state.gallery.title}</h1>
                <Card.Group itemsPerRow={4}>
                    { this.state.gallery.images.map(img => {
                        return <Card>
                                    <Image src={`/public/images/${img.thumbnail}`} />
                                    <Card.Meta>
                                        törlés
                                    </Card.Meta>
                                </Card>
                            })
                    }
                </Card.Group>
                <ConfirmModal/>
            </Layout>
        );
    }
}
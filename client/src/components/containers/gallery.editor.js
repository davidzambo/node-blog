import React from 'react';
import axios from 'axios';
import {Card, Image, Icon, Button} from 'semantic-ui-react';
import Layout from "../presentational/layout";
import ConfirmModal from "../presentational/confirm-modal";
import {connect} from "react-redux";
import {resetConfirm, setHeader, setOnCancel, setOnConfirm, setOpen, setEntity, setQuestion} from "../../actions/confirm";

const mapStateToProps = state => {
    return {isAuthenticated: state.auth.isAuthenticated}
}

const mapDispatchToProps = dispatch => {
    return {
        setOpen: bool => dispatch(setOpen(bool)),
        setEntity: obj => dispatch(setEntity(obj)),
        setQuestion: question => dispatch(setQuestion(question)),
        setHeader: header => dispatch(setHeader(header)),
        setOnConfirm: func => dispatch(setOnConfirm(func)),
        setOnCancel: func => dispatch(setOnCancel(func)),
        resetConfirm: () => dispatch(resetConfirm()),
    };
};

class GalleryEditor extends React.Component{
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
        try {
            const response = await axios.get('/api/gallery', {
                params: {
                    slug: this.props.match.params.slug
                }
            });
            this.setState({gallery: response.data.galleries[0]});
        } catch (e){
            console.log('Error: ' + e);
        }

    }

    handleDelete(img){
        const image = {
            _id: this.state.gallery._id,
            image: img,
        };

        this.props.setEntity(this.props.details);
        this.props.setQuestion('Biztosan törölni szereté a képet?');
        this.props.setHeader('Kép törlése');
        this.props.setOnConfirm(() => axios({
            url: '/api/gallery',
            method: 'delete',
            data: image,
        })
            .then( response => {
                if (response.status === 200)
                    this.props.resetConfirm();
            }));
        this.props.setOnCancel(() => this.props.resetConfirm());
        this.props.setOpen(true);
    }

    render(){
        return(
            <Layout>
                <h1>{this.state.gallery.title}</h1>
                <Card.Group itemsPerRow={4}>
                    { this.state.gallery.images.map(img => {
                        return <Card key={img._id}>
                                    <Image src={`/public/images/${img.thumbnail}`} />
                                    <Card.Meta onClick={() => this.handleDelete(img)} className="pointer">
                                        <Icon color="red" name="trash"/> Törlés
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

export default connect(mapStateToProps, mapDispatchToProps)(GalleryEditor);
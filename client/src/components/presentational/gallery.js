import React from 'react';
import {Image, Label} from 'semantic-ui-react';
import Lightbox from 'react-images';
import axios from "axios/index";
import {connect} from "react-redux";
import {resetConfirm, setHeader, setOnCancel, setOnConfirm, setOpen, setQuestion, setEntity} from "../../actions/confirm";
import {setGalleries} from "../../actions/gallery";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setOpen: bool => dispatch(setOpen(bool)),
        setEntity: obj => dispatch(setEntity(obj)),
        setQuestion: question => dispatch(setQuestion(question)),
        setHeader: header => dispatch(setHeader(header)),
        setOnConfirm: func => dispatch(setOnConfirm(func)),
        setOnCancel: func => dispatch(setOnCancel(func)),
        resetConfirm: () => dispatch(resetConfirm()),
        setGalleries: galleries => dispatch(setGalleries(galleries)),
    };
};

class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.changeCurrentImage = this.changeCurrentImage.bind(this);
        this.showImage = this.showImage.bind(this);
        this.state = {
            isOpen: false,
            currentImage: 0,
        }
    }

    toggleLightbox(){
        this.setState( (prevState) => {
            return { currentImage: 0, isOpen: !prevState.isOpen}
        });
    }

    changeCurrentImage(number){
        let currentImage = this.state.currentImage;
        const {images} = this.props.details;
        if (currentImage + number > images.length - 1 ){
            currentImage = 0;
        } else if (currentImage + number < 0) {
            currentImage = images.length - 1;
        } else {
            currentImage += number;
        }

        this.setState({currentImage});
    }

    showImage(index){
        this.setState({currentImage: index});
    }

    handleDelete(gallery){
        this.props.setEntity(gallery);
        this.props.setQuestion(`Biztosan törölni szeretné a(z) ${gallery.title} című galériát a benne lévő képekkel együtt?`);
        this.props.setHeader('Galéria törlése');
        this.props.setOnConfirm(() => axios({
            url: '/api/gallery',
            method: 'delete',
            data: gallery,
        })
            .then( response => {
                if (response.status === 200){
                    this.props.resetConfirm();
                    this.props.setGalleries(response.data.galleries)
                }
            }));
        this.props.setOnCancel(() => this.props.resetConfirm());
        this.props.setOpen(true);
    }

    render(){
        const gallery = this.props.details;
        const images = gallery.images.map(img => {
            return {
                src: '/public/images/'+img.display,
                thumbnail: '/public/images/'+img.thumbnail,
                caption: (gallery.description) ? gallery.title + ' - ' + gallery.description : gallery.title,
            };
        });

        return(
            <div style={{textAlign: 'center', margin: '1rem'}}>
                <Label basic size="large">
                    {gallery.title} <small>({gallery.images.length})</small>
                </Label>
                <Image
                    circular
                    src={gallery.images[0] ? `/public/images/${gallery.images[0].thumbnail}` : "https://www.jainsusa.com/images/store/landscape/not-available.jpg"}
                    onClick={this.toggleLightbox}
                    className="pointer"
                    style={{objectFit: 'cover', width: 200, height: 200}}/>
                <Lightbox isOpen={this.state.isOpen}
                          images={images}
                          enableKeyboardInput
                          showCloseButton
                          showThumbnails
                          showImageCount
                          imageCountSeparator="/"
                          preloadNextImage
                          width={2000}
                          currentImage={this.state.currentImage}
                          onClickThumbnail={this.showImage}
                          onClickPrev={() => this.changeCurrentImage(-1)}
                          onClickNext={() => this.changeCurrentImage(1)}
                          onClose={this.toggleLightbox}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

/**
 * <Card.Header textAlign="center" as="h4" className="no-margin">
 {gallery.title} <small>({gallery.images.length})</small>
 </Card.Header>
 {this.props.isAuthenticated && <div>
         <Card.Meta>
             <a href={`/galeria/${gallery.slug}/szerkesztes`}><Icon color="orange"  name="edit"/> Szerkesztés</a>
         </Card.Meta>
         <Card.Meta onClick={() => this.handleDelete(gallery)} className="pointer">
             <Icon color="red" name="trash"/> Törlés
         </Card.Meta>
     </div>}
 */
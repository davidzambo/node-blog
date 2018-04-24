import React from 'react';
import {Card, Image, Icon} from 'semantic-ui-react';
import Lightbox from 'react-images';


export class Gallery extends React.Component{
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
            <Card>
                <Image src={gallery.images[0] ? `/public/images/${gallery.images[0].thumbnail}` : "https://www.jainsusa.com/images/store/landscape/not-available.jpg"} onClick={this.toggleLightbox}/>
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
                <Card.Header textAlign="center" as="h4" className="no-margin">
                    {gallery.title}
                </Card.Header>
                <a href={`/galeria/${gallery.slug}/szerkesztes`} className="absolute top right"><Icon color="orange"  name="edit"/></a>
            </Card>
        )
    }
}
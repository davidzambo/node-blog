import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import { deletePost, isConfirmDeletePostModalOpen } from '../../actions/posts';


const inlineStyle = {
    modal: {
        marginTop: '30%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

const mapStateToProps = state => {
    return {
        post: state.posts.postToHandle,
        isOpen: state.posts.isConfirmDeletePostModalOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletePost: () => dispatch(deletePost(this.props.post)),
        hideModal: () => dispatch(isConfirmDeletePostModalOpen(false))
    }
}

const ConnectedConfirmDeletePostModal = (props) => {
    return (
        <div>
            <Modal size='mini' open={props.isOpen} style={inlineStyle.modal}>
                <Modal.Header>
                    Bejegyzés törlése
                </Modal.Header>
                <Modal.Content>
                    <p>Biztosan törölni szeretné a(z) <strong>{props.post.title }</strong> című posztot?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive content='mégsem' onClick={props.hideModal}/>
                    <Button negative content='törlés' />
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedConfirmDeletePostModal);


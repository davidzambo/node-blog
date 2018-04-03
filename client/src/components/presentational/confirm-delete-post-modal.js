import React, {Component} from 'react';
import axios from 'axios';
import {Button, Modal} from 'semantic-ui-react';
import {connect} from "react-redux";
import {cancelPostAction, isConfirmDeletePostModalOpen} from '../../actions/posts';


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
        hideModal: () => dispatch(isConfirmDeletePostModalOpen(false)),
        cancelPostAction: () => dispatch(cancelPostAction())
    }
}

export class ConfirmDeletePostModal extends Component {
    deletePost() {
        axios.delete('/api/posts/' + this.props.post._id)
            .then(response => {
                if (response.status !== 200) {
                    console.error(response.statusText);
                } else {
                    this.props.hideModal();
                    this.props.cancelPostAction();
                }
            })
            .then(() => this.props.history.push('/'));
    }

    render() {
        return (
            <Modal size='mini' open={this.props.isOpen} style={inlineStyle.modal}>
                <Modal.Header>
                    Bejegyzés törlése
                </Modal.Header>
                <Modal.Content>
                    <p>Biztosan törölni szeretné a(z) <strong>{this.props.post.title}</strong> című posztot?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive content='mégsem' onClick={this.props.hideModal}/>
                    <Button negative content='törlés' onClick={this.deletePost.bind(this)}/>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeletePostModal);


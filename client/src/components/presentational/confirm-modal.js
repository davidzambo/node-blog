import React from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Parser from 'html-react-parser';

const inlineStyle = {
    modal: {
        marginTop: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

const mapStateToProps = state => {
    return {
        isOpen: state.confirm.isOpen,
        question: state.confirm.question,
        header: state.confirm.header,
        _handleCancel: state.confirm.onCancel,
        _handleConfirm: state.confirm.onConfirm,
    }
};

class ConfirmModal extends React.Component {
    render() {
        return (
            <Modal size='mini' open={this.props.isOpen} style={inlineStyle.modal}>
                <Modal.Header>
                    {this.props.header}
                </Modal.Header>
                <Modal.Content>
                    {Parser(this.props.question)}
                </Modal.Content>
                <Modal.Actions>
                    <Button positive labelPosition='left' icon='cancel' content='mégsem' onClick={ () => this.props._handleCancel() }/>
                    <Button negative labelPosition='left' icon='trash' content='törlés' onClick={ () => this.props._handleConfirm() } />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(ConfirmModal);
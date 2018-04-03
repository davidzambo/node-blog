import React from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

const inlineStyle = {
    modal: {
        marginTop: '30%',
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

export class ConfirmDeleteModal extends React.Component {
    render() {
        return (
            <Modal size='mini' open={this.props.isOpen} style={inlineStyle.modal}>
                <Modal.Header>
                    {this.props.header}
                </Modal.Header>
                <Modal.Content>
                    <p>{this.props.question}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive content='mégsem' onClick={ () => this.props._handleCancel() }/>
                    <Button negative content='törlés' onClick={ () => this.props._handleConfirm() } />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(ConfirmDeleteModal);
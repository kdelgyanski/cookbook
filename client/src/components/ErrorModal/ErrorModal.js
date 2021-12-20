import React from 'react';
import { Modal } from '../Modal';

const ErrorModal = ({
    message,
    onClose
}) => {

    return (
        <Modal
            id='error-modal'
            className='error-modal'
            title='Error'
            onClose={onClose}
        >
            <p>{message}</p>
        </Modal>
    );
};

export default ErrorModal;
import { createPortal } from 'react-dom';

import './ErrorModal.css';

const errorModalRoot = document.getElementById('error-modal-root');

const ErrorModal = ({
    message,
    onClose
}) => {

    const errorModal = <div className="app-modal">
        <div className="app-modal-header">
            <h5 className="app-modal-title">Error</h5>
        </div>
        <div className="app-modal-body">
            <p>{message}</p>
        </div>
        <div className="app-modal-footer">
            <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    </div>;

    return createPortal(errorModal, errorModalRoot);
};

export default ErrorModal;
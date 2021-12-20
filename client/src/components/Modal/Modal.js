import { createPortal } from 'react-dom';
import { Backdrop } from '../Backdrop/';

import './Modal.css';

const modalRoot = document.getElementById('modal-root');

const ModalLayout = ({
    id,
    className,
    title,
    children,
    onConfirm,
    onClose
}) => {

    const layout = <div
        id={id}
        className={`app-modal ${className ? className : ''}`}
    >
        <div className='app-modal-header'>
            <h5 className='app-modal-title'>{title}</h5>
        </div>
        <div className='app-modal-body'>
            {children}
        </div>
        <div className='app-modal-footer'>
            {onConfirm && <button
                type='button'
                className='btn btn-primary modal-confirm-button'
                onClick={onConfirm}
            >
                OK
            </button>}
            {onClose && <button
                type='button'
                className='btn btn-primary modal-close-button'
                onClick={onClose}
            >
                Close
            </button>}
        </div>
    </div>

    return createPortal(layout, modalRoot);
};

const Modal = props => {
    return <>
        <ModalLayout {...props} />
        <Backdrop id={`${props}-backdrop`} onClick={props.onClose} />
    </>;
};

export default Modal;
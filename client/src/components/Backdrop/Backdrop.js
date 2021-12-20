import { createPortal } from 'react-dom';

import './Backdrop.css';

const backdropRoot = document.getElementById('backdrop-root');

const Backdrop = ({
    id,
    className,
    onClick
}) => {

    const layout = <div
        id={id}
        className={`backdrop ${className ? className : ''}`}
        onClick={onClick}
    >
    </div>;

    return createPortal(layout, backdropRoot);

};

export default Backdrop;
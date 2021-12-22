import { ErrorModal } from '../../components';

import './Page.css';

const Page = ({
    className,
    error,
    onErrorClose,
    children
}) => {
    return (
        <div className={`container app-page ${className ? className : ''}`}>
            {error && <ErrorModal message={error} onClose={onErrorClose} />}
            {children}
        </div>
    );
};

export default Page;
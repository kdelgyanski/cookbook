import { Link } from 'react-router-dom';

import './Panel.css';

const Panel = ({
    id,
    className,
    title,
    children,
    maxVisibleItems,
    viewMoreUrl
}) => {
    return (
        <div id={id} className={`container app-panel ${className}`}>
            <h2 className='panel-title'>{title}</h2>
            <div className='panel-items'>
                {children.slice(0, maxVisibleItems)}
            </div>
            {children.length > maxVisibleItems && <Link className='view-more-link' to={`${viewMoreUrl}`} >View more</Link>}
        </div>
    );
};

export default Panel;
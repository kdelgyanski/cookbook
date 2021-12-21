import { Link } from 'react-router-dom';

import './Panel.css';

const Panel = ({
    id,
    className,
    title,
    children,
    maxVisibleItems,
    viewMoreUrl,
    singleItem,
}) => {
    return (
        <div id={id} className={`container app-panel ${className ? className : ''}`}>
            <h2 className='panel-title'>{title}</h2>
            <div className={`panel-items ${singleItem ? 'single-item' : ''}`}>
                {
                    !singleItem
                        ? children.slice(0, maxVisibleItems)
                        : children
                }
            </div>
            {children.length > maxVisibleItems && <Link className='view-more-link' to={`${viewMoreUrl}`} >View more</Link>}
        </div>
    );
};

export default Panel;
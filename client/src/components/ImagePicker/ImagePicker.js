import React from 'react';
import { BsXCircle } from 'react-icons/bs';

import { ErrorModal } from '../ErrorModal';

import './ImagePicker.css';

const ImagePicker = ({
    id,
    className,
    onImagePicked,
    defaultPreview,
    imageFile
}) => {

    const inputRef = React.useRef(null);

    const [file, setFile] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [hover, toggleHover] = React.useState(false);
    const [initialImage, setInitialImage] = React.useState(null);

    React.useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            inputRef.current.value = null;
            return;
        } else {
            const fileReader = new FileReader();
            fileReader.onload = () => setPreviewUrl(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }, [file]);

    React.useEffect(() => {
        if (imageFile) {
            setInitialImage(`http://localhost:8000/${imageFile}`);
        }
    }, [imageFile]);

    const handleImagePicked = e => {

        if (e.target.files && e.target.files.length === 1) {
            setFile(e.target.files[0]);
            onImagePicked(e.target.files[0]);
        } else if (file) {
            return;
        } else {
            setError('No valid image selected!');
        }

    };

    return (
        <>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
            <div className={`image-picker ${!previewUrl && defaultPreview && !initialImage ? 'default-preview' : ''} ${className ? className : ''}`}>
                <input
                    id={`input-${id}`}
                    className='image-picker-input'
                    ref={inputRef}
                    type='file'
                    accept='.png,.jpg,.jpeg'
                    onChange={handleImagePicked}
                />
                {previewUrl && <Preview previewUrl={previewUrl} onDelete={() => setFile(null)} />}
                {!previewUrl && initialImage && <Preview
                    previewUrl={initialImage}
                    onDelete={() => {
                        setFile(null);
                        setInitialImage(null);
                    }}
                />}
                {defaultPreview && !previewUrl && !initialImage && <Preview
                    className={`${hover ? 'hovered' : ''}`}
                    previewUrl={defaultPreview}
                    onClick={() => inputRef.current.click()}
                    onMouseOver={() => toggleHover(true)}
                    onMouseOut={() => toggleHover(false)}
                />}
                <button
                    className={`btn btn-primary pick-btn ${!previewUrl && defaultPreview && !initialImage ? 'default-preview' : ''} ${hover ? 'hovered' : ''}`}
                    type='button'
                    onClick={() => inputRef.current.click()}
                    onMouseOver={() => toggleHover(true)}
                    onMouseOut={() => toggleHover(false)}
                >
                    Pick image
                </button>
            </div>
        </>
    );
};

const Preview = ({
    previewUrl,
    className,
    onDelete,
    onClick,
    onMouseOver,
    onMouseOut
}) => {
    return (
        <div
            className={`preview-wrapper ${className ? className : ''}`}
            onClick={onClick ? onClick : undefined}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            <img className='img-fluid preview-image' src={previewUrl} alt='Preview' />
            {onDelete && <button
                className='btn delete-image-btn'
                type='button'
                onClick={onDelete}
            >
                <BsXCircle />
            </button>}
        </div>
    );
};

export default ImagePicker;
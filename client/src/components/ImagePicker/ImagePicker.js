import React from 'react';
import { BsXCircle } from 'react-icons/bs';

import { ErrorModal } from '../ErrorModal';

import './ImagePicker.css';

const ImagePicker = ({
    id,
    className,
    onImagePicked
}) => {

    const inputRef = React.useRef(null);

    const [file, setFile] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        } else {
            const fileReader = new FileReader();
            fileReader.onload = () => setPreviewUrl(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }, [file]);

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
            <div className={`image-picker ${className ? className : ''}`}>
                <input
                    id={`input-${id}`}
                    className='image-picker-input'
                    ref={inputRef}
                    type='file'
                    accept='.png,.jpg,.jpeg'
                    onChange={handleImagePicked}
                />
                {previewUrl && <div className='preview-wrapper'>
                    <img className='img-fluid preview-image' src={previewUrl} alt='Preview' />
                    <button
                        className='btn delete-image-btn'
                        type='button'
                        onClick={() => setFile(null)}
                    >
                        <BsXCircle />
                    </button>
                </div>}
                <button
                    className='btn btn-primary pick-btn'
                    type='button'
                    onClick={() => inputRef.current.click()}
                >
                    Pick image
                </button>
            </div>
        </>
    );
};

export default ImagePicker;
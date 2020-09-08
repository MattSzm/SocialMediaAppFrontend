import React, {useState} from 'react';
import ImageUploading from 'react-images-uploading';
import StandardButton from "../../UI/StandardButton/StandardButton";

const UploadFile = (props) => {
    const [images, setImages] = useState([]);
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        props.upload(imageList[0]);
    };

    return (
        <div className="App">
            <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        {images[0] ? <StandardButton
                                        isGrey={true}
                                        click={onImageUpdate}
                                        >
                                            Update
                                        </StandardButton>
                                    :
                                        <StandardButton
                                        isGrey={true}
                                        isDragging ={isDragging}
                                        click={onImageUpload}
                                        drag = {dragProps}
                                    >
                                        Upload Image
                                    </StandardButton>
                        }
                        {images[0]  ? <div style={{height: '0.5em'
                        }} /> : null }
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <span style={{
                                        cursor: 'pointer',
                                        color: '#657786'
                                    }}
                                        onClick={() => onImageRemove(index)}><strong>Remove</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default UploadFile;
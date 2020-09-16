import React, {useState} from 'react';
import ImageUploading from 'react-images-uploading';
import StandardButton from "../../UI/StandardButton/StandardButton";

const UploadImages = (props) => {
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        props.upload(imageList);
    };

    let imageWidth = 100;
    if(props.userEdit){
        imageWidth = 200;
    }
    return (
        <div className="App">
            <ImageUploading
                value={props.images}
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
                    <div className="upload__image-wrapper">
                        {props.images[0] ? (<StandardButton
                                        isTransparent={props.tranparentButtons}
                                        isGrey={!props.tranparentButtons}
                                        click={onImageUpdate}
                                        >
                                            Update
                                        </StandardButton>)
                                    :
                                        (<StandardButton
                                        isTransparent={props.tranparentButtons}
                                        isGrey={!props.tranparentButtons}
                                        isDragging ={isDragging}
                                        click={onImageUpload}
                                        drag = {dragProps}
                                    >
                                            {props.registration ? 'Set your picture ': 'Upload'}
                                    </StandardButton>)
                        }
                        {props.images[0]  ? <div style={{height: '0.5em'
                        }} /> : null }
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width={imageWidth} />
                                <div className="image-item__btn-wrapper">
                                    <span style={{
                                        cursor: 'pointer',
                                        color: '#657786',
                                    }}
                                        onClick={() => onImageRemove(index)}>
                                        <strong style={props.registration ? {color: "white"} : null}>
                                            Remove
                                        </strong>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default UploadImages;
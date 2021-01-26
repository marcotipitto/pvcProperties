import React from 'react';
import './FileLoader.scss';
import { uploadImage } from 'actions';
import { blobToFile, getCroppedImg } from 'helpers/functions';
import Spinner from 'components/shared/Spinner';
// import ImageCrop from './ImageCrop';

class ImageSnippet {
    constructor(src, name, type) {
        this.src = src;
        this.name = name;
        this.type = type;
    }
}

class FileLoader extends React.Component {

    constructor() {
        super();
        this.inputRef = React.createRef();
        this.fileReader = new FileReader();
        this.originalImage = null;
        this.state = {
            selectedImgs: null,
            imgStatus: 'INIT',
            croppedImg: null,
        }
    }

    handleImageLoad = image => this.originalImage = image

    // handleCropComplete = async crop => {
    //     if (!this.originalImage) { return; }
    //     const { selectedImg } = this.state;
    //     const croppedImg = await getCroppedImg(this.originalImage, crop, selectedImg.name);
    //     this.setState({ croppedImg });
    // }

    removeFileLoadListener = () => {
        this.fileReader.removeEventListener('load', this.handleImageLoad);
    }

    handleImageUpload = () => {
        debugger;
        const { selectedImgs } = this.state;
        this.changeImageStatus('PENDING');
        const imagesToUpload = [];
        selectedImgs.forEach(selectedImg => imagesToUpload.push(selectedImg))
        // imagesToUpload[0] = blobToFile(selectedImgs[0])
        uploadImage(imagesToUpload)
            .then(uploadedImages => {
                this.props.onFileUpload(uploadedImages);
                this.changeImageStatus('UPLOADED');
            })
            .catch(() => {
                this.changeImageStatus('ERROR');
            })
    }

    handleChange = event => {
        const files = event.target.files;
        const selectedImgs = [];
        // this.fileReader.onloadend = (event) => {
        //     const selectedImgs = [];
        //     files.forEach(file => {
        //         selectedImgs.push(new ImageSnippet(event.target.result, file.name, file.type));
        //     });

        //     this.setState({ selectedImgs, imgStatus: 'LOADED' });
        // }
        // files.forEach((file) => this.fileReader.readAsDataURL(file));
        // files.map(file => file => {
        //     this.fileReader.readAsDataURL(file)
        // }) 

        // const file = event.target.files[0];
        // this.fileReader.onloadend = (event) => {
        //     const selectedImg = new ImageSnippet(event.target.result, file.name, file.type);
        //     this.setState({ selectedImg, imgStatus: 'LOADED' });
        // }
        // this.fileReader.readAsDataURL(file);

        for (let i = 0; i < files.length; i++) {
            let self = this;
            (function (file) { 
                const reader = new FileReader();
                reader.onloadend = (event) => {
                    debugger;
                    selectedImgs.push(new ImageSnippet(event.target.result, file.name, file.type));
                    if (selectedImgs.length === files.length) {
                        self.setState({ selectedImgs, imgStatus: 'LOADED' });
                    }
                }
                reader.readAsDataURL(file);
            })(files[i])
        }
    }

    cancelImage = () => {
        this.inputRef.current.value = null;
        this.originalImage = null;
        this.setState({ selectedImgs: [], croppedBase64: null, imgStatus: 'INIT' });
    }

    changeImageStatus = imgStatus => this.setState({ imgStatus })

    render() {
        const { selectedImgs, imgStatus, croppedImg } = this.state;
        return (
            <div className="img-upload-container mb-2">
                <label className="img-upload btn btn-pvc-main">
                    <span className="upload-text">Select an image</span>
                    <input
                        ref={this.inputRef}
                        onChange={this.handleChange}
                        accept=".jpg, .png, .jpeg, .heic, .heif"
                        className="fileInput"
                        type="file"
                        multiple="multiple"
                    />
                </label>
                {/* { selectedImgs &&
                    <ImageCrop
                        src={selectedImg.src}
                        onCropComplete={this.handleCropComplete}
                        onImageLoaded={this.handleImageLoad}
                    />
                } */}
                { selectedImgs && selectedImgs.length > 0 &&
                    <>
                        <div className="img-preview-container mb-2">
                            <div className="img-preview">
                                {selectedImgs.map(selectedImg =>
                                    <img src={selectedImg.src} alt="" key={selectedImg.name}></img>
                                )}
                            </div>
                            {imgStatus === 'PENDING' &&
                                <div className="spinner-container upload-status">
                                    <Spinner />
                                </div>
                            }
                            {imgStatus === 'UPLOADED' &&
                                <div className="alert alert-success upload-status">
                                    Image has been succesfuly uploaded!
                                </div>
                            }
                            {imgStatus === 'ERROR' &&
                                <div className="alert alert-danger upload-status">
                                    Image upload failed!
                                </div>
                            }
                        </div>
                        { imgStatus === 'LOADED' &&
                            <>
                                <button
                                    onClick={this.handleImageUpload}
                                    className="btn btn-success mr-1"
                                    type="button">
                                    Upload
                                </button>
                            </>
                        }
                        <button
                            onClick={this.cancelImage}
                            className="btn btn-danger"
                            type="button">
                            Cancel
                        </button>
                    </>
                }
            </div>
        )
    }
}

export default FileLoader;

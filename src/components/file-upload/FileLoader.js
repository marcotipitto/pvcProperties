import React from 'react';
import './FileLoader.scss';
import { uploadImage } from 'actions';
import Spinner from 'components/shared/Spinner';

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

    removeFileLoadListener = () => {
        this.fileReader.removeEventListener('load', this.handleImageLoad);
    }

    handleImageUpload = () => {
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
        for (let i = 0; i < files.length; i++) {
            let self = this;
            (function (file) { 
                const reader = new FileReader();
                reader.onloadend = (event) => {
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
        const { selectedImgs, imgStatus } = this.state;
        return (
            <div className="img-upload-container mb-2">
                <label className="img-upload btn btn-pvc-main">
                    <span className="upload-text">Select an image</span>
                    <input
                        ref={this.inputRef}
                        onChange={this.handleChange}
                        accept=".jpg, .png, .jpeg"
                        className="fileInput"
                        type="file"
                        multiple="multiple"
                    />
                </label>
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

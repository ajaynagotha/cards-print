import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './style.css';
import { Button, Modal } from 'react-bootstrap'
export class ImageCrop extends PureComponent {
    state = {
        src: null,
        show: false,
        crop: {
            unit: '%',
            width: 30,
            aspect: 3 / 4
        }
    };

    onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ src: reader.result })
                this.setState({ show: true })
                document.getElementById("root").style.overflow="auto"
            }
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = (image) => {
        this.imageRef = image;
    };
    hideCrop = () => {
        console.log(document.getElementById("root"))
        document.getElementById("root").style.overflow="initial"
        this.setState({ show: false })
    }
    onCropComplete = (crop) => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        //reject(new Error('Canvas is empty'));
                        console.error('Canvas is empty');
                        return;
                    }
                    blob.name = fileName;
                    window.URL.revokeObjectURL(this.fileUrl);
                    this.fileUrl = window.URL.createObjectURL(blob);
                    resolve(this.fileUrl);
                },
                'image/jpeg',
                1
            );
        });
    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div className="img-crop">
                {
                    !croppedImageUrl && (<div className='select-file'>
                        <div className='select-text'>Upload your
                            Image here</div>
                        <label className='select-btn' htmlFor='imgSelect'>Select File</label>
                        <input id="imgSelect" type="file" accept="image/*" onChange={this.onSelectFile} />
                    </div>)
                }

                {this.state.show && (
                    <Modal show={this.state.show}>
                        <Modal.Body>
                            <ReactCrop
                                src={src}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        </Modal.Body>
                        <Modal.Footer><Button onClick={this.hideCrop}>Crop Image</Button></Modal.Footer>
                    </Modal>
                )}
                {croppedImageUrl && (
                    <div className="image-preview">
                        <div className='img-actions pnone'>
                            <img src="/assets/images/edit-icon.svg"  alt='img-edit' onClick={() => {this.setState({show: true})}}/>
                            <img src="/assets/images/delete-icon.svg"  alt='img-edit' onClick={() => {this.setState({croppedImageUrl: null})}}/>
                        </div>
                        <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                    </div>
                )}
            </div>
        ); 
    }
}
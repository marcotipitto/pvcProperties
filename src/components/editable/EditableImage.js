import React from 'react';
import EditableComponent from './EditableComponent';
import FileLoader from 'components/file-upload/FileLoader';

const ImageView = ({ value, ...rest }) => {
    console.log(value)
    return <img {...rest} src={value} alt=""></img>
}

const createEvent = (value) => ({target: {value}});

export class EditableImage extends React.Component {

    render() {
        return (
            <EditableComponent
                {...this.props}
                viewComponent={ImageView}
                className="editable-image"
                renderComponent={(value, onChange, onKeyDown) =>
                    <FileLoader onFileUpload={images => {
                        console.log(images)
                        onChange(createEvent(images.map(image => image._id)))}}/>
                }
            />
        )
    }
}
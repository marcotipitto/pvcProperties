import React from 'react';
import { Carousel } from 'react-bootstrap';

const RentalCarousel = ({images}) => {
    return (
        <Carousel className="carousel">
            {images.map(image => 
                <Carousel.Item key={image.cloudinaryId}>
                    <div className="container">
                        <img
                            className="rental-img d-block w-100"
                            src={image.url}
                            alt={image.cloudinaryId}
                        />
                    </div>
                </Carousel.Item>
            )}
        </Carousel>
    )
}

export default RentalCarousel
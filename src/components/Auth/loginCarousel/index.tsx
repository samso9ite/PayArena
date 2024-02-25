import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function LoginCarousel(props: { imgSrc: string | undefined; }) {
  return (
    <Carousel variant="dark carousel-fade">
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={props.imgSrc}
                alt="Security"
            />
            <Carousel.Caption>
                <p>Security and Compliance Infrastructure for businesses.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={props.imgSrc}
                alt="Security"
            />
            <Carousel.Caption>
                <p>Security and Compliance Infrastructure for businesses.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  );
}


import React from 'react';
import Style from './SliderView.module.css';
import {Config} from './SliderView.config.js'; 
import PropTypes from 'prop-types';

export default function SliderView(props) {
    
    const currentSlide = props.slideData;
    const width = props.width;
    const height = props.height;

    return (  
             <figure style={{width:width,height:height}} className={Style.wrapper} title={currentSlide.title}>
                <img  src={currentSlide.src} alt={currentSlide.title}/>
                <figcaption>
                    <h2>{currentSlide.title}</h2>
                    <p>{currentSlide.description}</p>
                </figcaption>
            </figure>
    )
}

SliderView.propTypes = {
    width:PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
    slideData:PropTypes.shape({
        title:PropTypes.string,
        description:PropTypes.string,
        src:PropTypes.string,
    }),
}

SliderView.defaultProps={
    width:Config.DEFAULT_WIDTH,
    height:Config.DEFAULT_HEIGHT,
}
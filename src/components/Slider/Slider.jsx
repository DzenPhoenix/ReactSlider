import React from 'react';
import SliderView from './SliderView/SliderView.jsx';
import SliderControl from './SliderControl/SliderControl.jsx';
import {Config} from './Slider.config.js';
import { Data } from '../../data/dbImg.jsx';

export default function Slider() {
    const [currentSlideIdx, setCurrentSlideIdx] = React.useState(Config.START_INDEX);
    const [width,setWidth]=React.useState(Config.DEFAULT_WIDTH);
    const [height,setHeight]=React.useState(Config.DEFAULT_HEIGHT);
    const [isFullScreen, setIsFullScreen] = React.useState(false);


    const nextImgHandler = () => {
        setCurrentSlideIdx((currentSlideIdx + Config.STEP_FORWARD) % Data.length);
    }

    const prevImgHandler = () => {
        setCurrentSlideIdx((currentSlideIdx - Config.STEP_BACK + Data.length) % Data.length);
    }

    const fullScreenMode = (isFullScreen,e)=>{
        setIsFullScreen(isFullScreen);
        if(isFullScreen){
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        else{
            setWidth(Config.DEFAULT_WIDTH);
            setHeight(Config.DEFAULT_HEIGHT);
        }
    }

    return (
        <div>
            <SliderView slideData={Data[currentSlideIdx]} width={width} height={Config.VIEW_HEIGHT_RATIO*height} ></SliderView>
            <SliderControl
                width={width} height={Config.CONTROL_HEIGHT_RATIO*height}
                nextImgHandler={nextImgHandler} prevImgHandler={prevImgHandler} fullScreenMode={fullScreenMode} isFullScreen={isFullScreen}
            ></SliderControl>
        </div>
    )
}

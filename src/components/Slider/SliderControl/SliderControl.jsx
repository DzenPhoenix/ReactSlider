import React from 'react';
import Style from './SliderControl.module.css';
import Icon from '@mdi/react';
import { mdiSkipPreviousCircle, mdiSkipNextCircle, mdiPlayCircle, mdiOverscan, mdiPauseCircle } from '@mdi/js';
import {Config} from './SliderControl.config.js';
import PropTypes from 'prop-types';


export default function SliderControl(props) {
    const [delay, setDelay] = React.useState(Config.MIN_DELAY);
    const [isPlaying, setIsPlaying] = React.useState(false);
    
    let id=Config.DEFAULT_ID_FOR_TIMER;
    const {width,height,isFullScreen}=props;

    const playPauseImgHandler = () => {
        setIsPlaying(!isPlaying);
        if(id!==Config.DEFAULT_ID_FOR_TIMER){
            clearTimeout(id);
        }
    }

    const fullScreenHandler=()=>{
        props.fullScreenMode(!isFullScreen);
    }

    const startTimer = () => {
        if(isPlaying){
            id=setTimeout(() => {
                props.nextImgHandler();
            }, delay);
        }
    }


    React.useEffect(startTimer);

    return (
        <div style={{ width: width, height: height }} className={Style.wrapper}>
            <div style={{ height: height * Config.RANGE_PANEL_HEIGHT_RATIO }} className={Style.rangePanel}>
                Delay:
                <input type="range" value={delay} min={Config.MIN_DELAY} max={Config.MAX_DELAY} onChange={(e) => { setDelay(e.target.value) }} />
                {delay}
            </div>
            <div className={Style.iconsPanel}>
                <Icon height={height * Config.ICONS_PANEL_HEIGHT_RATIO} path={mdiSkipPreviousCircle} onClick={props.prevImgHandler} />
                <Icon height={height * Config.ICONS_PANEL_HEIGHT_RATIO} path={isPlaying ? mdiPauseCircle : mdiPlayCircle} onClick={playPauseImgHandler} />
                <Icon height={height * Config.ICONS_PANEL_HEIGHT_RATIO} path={mdiSkipNextCircle} onClick={props.nextImgHandler} />
                <Icon height={height * Config.ICONS_PANEL_HEIGHT_RATIO} path={mdiOverscan } onClick={fullScreenHandler} />
            </div>
        </div>
    )
}

SliderControl.propTypes = {
    width:PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
    isFullScreen:PropTypes.bool.isRequired,
    nextImgHandler:PropTypes.func,
    prevImgHandler:PropTypes.func,
    fullScreenMode:PropTypes.func
}

SliderControl.defaultProps={
    width:Config.DEFAULT_WIDTH,
    height:Config.DEFAULT_HEIGHT,
    isFullScreen:false,
}
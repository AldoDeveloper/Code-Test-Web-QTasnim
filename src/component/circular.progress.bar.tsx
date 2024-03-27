import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

interface PropsOption{
    value : number,
    strokeColor ?: string,
    strokeWidth ?: number,
    strokeLinecap ?: 'butt' | 'round'
    textFontSize ?: number,
    textColor ?: string,
    minValue ?: number,
    maxValue ?: number,
    backgroundTrail ?: string
}

export const CircularProgresBar = (props : PropsOption): React.ReactNode | React.ReactElement => {

    const { 
        value, 
        strokeColor, 
        strokeWidth, 
        strokeLinecap, 
        textFontSize, 
        textColor ,
        minValue,
        maxValue,
        backgroundTrail
    } = props;

    return (
        <React.Fragment>
            <CircularProgressbarWithChildren
                value={value}
                strokeWidth={strokeWidth ? strokeWidth : 10}
                minValue={minValue}
                maxValue={maxValue}
                styles={{
                    root: {},
                    path: {
                        stroke: `${strokeColor ? strokeColor : 'rgba(50, 150, 250, 0.7)'}`,
                        strokeLinecap: `${strokeLinecap ? strokeLinecap : 'butt'}`,
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    trail: {
                        stroke: backgroundTrail ? backgroundTrail : '#d6d6d6',
                        strokeLinecap: 'round',
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    text: {
                        textAlign: 'center'
                    },
                    background: {
                        fill: '#3e98c7',
                    },
                }}>
                <div style={{ fontSize: textFontSize ? textFontSize : 12, marginTop: -12 }}>
                    <strong className={textColor ? textColor : ''}>{value}</strong>
                </div>
            </CircularProgressbarWithChildren>
        </React.Fragment>
    )
}
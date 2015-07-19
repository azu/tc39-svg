// LICENSE : MIT
"use strict";
import React from "react"
class BackgroundLine extends React.Component {
    render() {
        return <path className="BackgroundLine"
                     d={`M ${this.props.x} ${this.props.y} H500`} stroke="black" strokeWidth="1" fill="none"/>
    }
}
export default class StageArea extends React.Component {
    static get defaultProps() {
        return {
            x: 0,
            y: 0
        };
    }

    render() {
        var {xRange, yRange} = this.props;
        var height = 500 - yRange(this.props.y);
        var lineHeight = height / 5;
        var x = xRange(this.props.x);
        var lines = [1, 2, 3, 4].map(index => {
            return <BackgroundLine key={index} x={x} y={lineHeight*index}/>
        });
        return <g className="BackgroundArea">
            <rect x={x}
                  y={yRange(this.props.y)}
                  width={500-xRange(this.props.x)}
                  height={height}
                  strokeWidth="1" stroke="black"
                  fill="none"/>
            {lines}
        </g>;
    }
}
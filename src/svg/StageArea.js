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
            x: 100,
            y: 0
        };
    }

    render() {
        var height = 500 - this.props.y;
        var lineHeight = height / 5;
        var lines = [1, 2, 3, 4].map(index => {
            return <BackgroundLine key={index} x={this.props.x} y={lineHeight*index}/>
        });
        return <g className="BackgroundArea">
            <rect x={this.props.x}
                  y={this.props.y}
                  width={500-this.props.x}
                  height={height}
                  strokeWidth="1" stroke="black"
                  fill="none"/>
            {lines}
        </g>;
    }
}
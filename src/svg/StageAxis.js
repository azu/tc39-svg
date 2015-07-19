// LICENSE : MIT
"use strict";
import React from "react"
import SVGText from "./SVGText"
export default class StageAxis extends React.Component {
    render() {
        var {xRange,yRange} = this.props;
        var x = xRange(0);
        return <g className="StageLabel">
            <SVGText width={xRange(100)} x={x} y={yRange(10)}>
                Stage 4
                Finished
            </SVGText>
            <SVGText width={xRange(100)} x={x} y={yRange(30)}>
                Stage 3
                Candidate
            </SVGText>
            <SVGText width={xRange(100)} x={x} y={yRange(50)}>
                Stage 2
                Draft
            </SVGText>
            <SVGText width={xRange(100)} x={x} y={yRange(70)}>
                Stage 1
                Proposal
            </SVGText>
            <SVGText width={xRange(100)} x={x} y={yRange(90)}>
                Stage 0
                Stawman
            </SVGText>
        </g>
    }
}
// LICENSE : MIT
"use strict";
import React from "react"
export default class StageLabel extends React.Component {
    render() {
        return <g className="StageLabel" fill="red">
            <text x="0" y="50">
                Stage 4
            </text>
            <text x="0" y="150">
                Stage 3
            </text>
            <text x="0" y="250">
                Stage 2
            </text>
            <text x="0" y="350">
                Stage 1
            </text>
            <text x="0" y="450">
                Stage 0
            </text>
        </g>
    }
}
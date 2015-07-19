// LICENSE : MIT
"use strict";
import React from "react"
export default class SpecItem extends React.Component {
    static get defaultProps() {
        return {
            x: 0,
            width: 100,
            height: 40,
            stageLevel: 0
        };
    }

    labelByStage(stageLevel) {
        return {
            0: "Stawman",
            1: "Proposal",
            2: "Draft",
            3: "Candidate",
            4: "Finished"
        }[stageLevel]
    }

    render() {
        var {xRange, yRange} = this.props;
        var marginBottom = 50 + 25;
        var levelHeight = 100 / 5;
        var stageY = (5 - this.props.stageLevel) * yRange(levelHeight);
        var x = xRange(this.props.x);
        return <g className="SpecItem">
            <rect className="SpecItem-box"
                  x={x}
                  y={stageY - marginBottom}
                  width={this.props.width}
                  height={this.props.height}
                  strokeWidth="1" stroke="black"
                  fill="none"/>
            <text x={x + this.props.width/2}
                  y={stageY - marginBottom + this.props.height/2 + 5}
                  textAnchor="middle"
                  alignmentBaseline="central"
                  dominantBaseline="middle">
                {this.props.proposalName}
            </text>
        </g>
    }
}
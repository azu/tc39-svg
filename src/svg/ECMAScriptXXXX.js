// LICENSE : MIT
"use strict";
import React from "react"
import SpecItem from "./SpecItem"
export default class ECMAScriptXXXX extends React.Component {
    static get defaultProps() {
        return {
            specItems: []
        };
    }

    render() {
        var {xRange, yRange} = this.props;
        var range = xRange.range();
        var itemWidth = range[1] - range[0];
        var specItems = this.props.completeSpecList.map((spec, index)=> {
            return <SpecItem key={spec.name}
                             proposalName={spec.name}
                             stageLevel={index}
                             width={itemWidth}
                             xRange={xRange} yRange={yRange}/>
        });
        return <g className="ECMAScriptXXXX">
            <rect x={xRange(0)}
                  y={yRange(0)}
                  width={this.props.width}
                  height={this.props.height}
                  strokeWidth="1" stroke="black"
                  fill="#bcbd22"/>
            <text x={xRange(50)}
                  y={yRange(10)}
                  textAnchor="middle"
                  alignmentBaseline="central"
                  dominantBaseline="middle">
                {this.props.versionName}
            </text>
            {specItems}
        </g>
    }
}
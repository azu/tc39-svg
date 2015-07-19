// LICENSE : MIT
"use strict";
import React from "react"
export default class YearAxis extends React.Component {
    render() {
        var {xRange,yRange} = this.props;
        return <g className="YearAxis">
            <text x={xRange(0)}
                  y={yRange(100)}
                  textAnchor="start"
                  alignmentBaseline="central"
                  dominantBaseline="middle">
                {this.props.beginYear}
            </text>
            <rect x={xRange(0)} y={yRange(0)}
                  width={xRange(100)} height={40}
                  strokeWidth="1" stroke="black"
                  fill="none"
                />
            <rect x={xRange(0)} y={yRange(0)}
                  width={xRange(this.props.processValue)} height={40}
                  strokeWidth="1" stroke="black"
                  fill="#6baed6"
                />
            <text x={xRange(100)}
                  y={yRange(100)}
                  textAnchor="end"
                  alignmentBaseline="central"
                  dominantBaseline="middle">
                {this.props.beginYear + 1}
            </text>
        </g>
    }
}
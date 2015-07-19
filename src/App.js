// LICENSE : MIT
"use strict";
import React from "react"
import {linear} from "d3-scale"
import StageAxis from "./svg/StageAxis"
import StageArea from "./svg/StageArea"
import SpecItem from "./svg/SpecItem"
class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            stageLevel: 0
        };
    }

    componentDidMount() {
        setInterval(()=> {
            var AM = 1;
            if (this.state.stageLevel === 4) {
                AM = -1
            } else if (this.state.stageLevel === 0) {
                AM = 1;
            }
            this.setState({
                stageLevel: this.state.stageLevel + AM
            });
        }, 1000);
    }

    render() {
        var TenPercent = [0, 100];
        var xAreaRange = linear().domain(TenPercent).range([100, 500]);
        var yAreaRange = linear().domain(TenPercent).range([0, 500]);
        var xAxisRange = linear().domain(TenPercent).range([0, 100]);
        var yAxisRange = linear().domain(TenPercent).range([0, 500]);
        var xSpecItemRange = linear().domain(TenPercent).range([100, 500]);
        var ySpecItemRange = linear().domain(TenPercent).range([0, 500]);
        return <svg className="App" viewBox="0 0 500 500">
            <title>viewBoxのサンプル1</title>
            <SpecItem xRange={xSpecItemRange} yRange={ySpecItemRange} stageLevel={this.state.stageLevel}/>
            <StageAxis xRange={xAxisRange} yRange={yAxisRange}/>
            <StageArea xRange={xAreaRange} yRange={yAreaRange}/>
        </svg>
    }
}

React.render(<App />, document.body);
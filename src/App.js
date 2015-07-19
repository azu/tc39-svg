// LICENSE : MIT
"use strict";
import React from "react"
import {linear} from "d3-scale"
import StageAxis from "./svg/StageAxis"
import StageArea from "./svg/StageArea"
import SpecItem from "./svg/SpecItem"
import YearAxis from "./svg/YearAxis"
import ECMAScript from "./svg/ECMAScriptXXXX"
import range from "array-range"
var specList = [
    {
        name: "Object.observe()",
        stageLevel: 0
    },
    {
        name: "async/await",
        stageLevel: 0
    },
    {
        name: "SIMD",
        stageLevel: 0
    },
    {
        name: "function.sent",
        stageLevel: 0
    }
];
var completeSpecList = [
    {
        name: "Promise",
        stageLevel: 4
    }, {
        name: "Generator",
        stageLevel: 4
    }, {
        name: "Modules",
        stageLevel: 4
    }, {
        name: "Arrow Function",
        stageLevel: 4
    }
];


function randomUp() {
    return Math.random() < 0.5 ? 1 : 0;

}
class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            beginYear: 2015,
            processValue: 0
        };
    }

    start() {
        if (this.time) {
            return;
        }
        this.time = setInterval(()=> {
            if (this.state.processValue >= 100) {
                // complete spec. and reset progress
                completeSpecList = specList.filter(spec => {
                    return spec.stageLevel >= 4
                });
                specList = specList.filter(spec => {
                    return spec.stageLevel < 4
                });
                this.setState({
                    beginYear: this.state.beginYear + 1,
                    processValue: 0
                });
                // finish roop
                if (specList.length === 0) {
                    clearInterval(this.time);
                }
                return;
            }
            // 2コづつ
            range(Math.min(specList.length, 2)).map(function (index) {
                if (specList[index] && specList[index].stageLevel < 4) {
                    specList[index].stageLevel += randomUp();
                }
            });
            this.setState({
                processValue: this.state.processValue + 10
            });
        }, 1000);
    }

    render() {
        var TenPercent = [0, 100];
        var xAreaRange = linear().domain(TenPercent).range([100, 500]);
        var yAreaRange = linear().domain(TenPercent).range([0, 500]);
        var xAxisRange = linear().domain(TenPercent).range([0, 100]);
        var yAxisRange = linear().domain(TenPercent).range([0, 500]);

        var yearXRange = linear().domain([0, 100]).range([0, 500]);
        var yearYRange = linear().domain([0, 100]).range([520, 580]);

        var ECMAXRange = linear().domain(TenPercent).range([500, 800]);
        var ECMAYRange = linear().domain(TenPercent).range([0, 500]);
        var specs = range(Math.min(specList.length, 2)).map(function (dummy, index) {
            var xSpecItemRange = linear().domain(TenPercent).range([150 * (index + 1), 500]);
            var ySpecItemRange = linear().domain(TenPercent).range([0, 500]);
            return <SpecItem key={specList[index].name}
                             proposalName={specList[index].name}
                             stageLevel={specList[index].stageLevel}
                             xRange={xSpecItemRange} yRange={ySpecItemRange}
                             width={150}
                />;
        });
        return <svg className="App" viewBox="0 0 800 600"
                    onClick={this.start.bind(this)}>
            <title>TC39 Process</title>
            <StageAxis xRange={xAxisRange} yRange={yAxisRange}/>
            <StageArea xRange={xAreaRange} yRange={yAreaRange}/>
            <YearAxis xRange={yearXRange} yRange={yearYRange}
                      beginYear={this.state.beginYear}
                      processValue={this.state.processValue}/>
            <ECMAScript versionName={`ECMAScript ${this.state.beginYear}`}
                        completeSpecList={completeSpecList}
                        width={300} height={500}
                        xRange={ECMAXRange} yRange={ECMAYRange}/>
            {specs}
        </svg>
    }
}

React.render(<App />, document.body);
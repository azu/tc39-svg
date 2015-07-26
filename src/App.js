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
import querystring from "querystring"
// ?reset
var queries = querystring.parse(location.search.replace("?", ""));
var specList = typeof queries.reset !== "undefined" ? [] : [
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
            processValue: 0,
            specList: specList
        };
    }

    start() {
        if (this.time) {
            return;
        }
        this.time = setInterval(()=> {
            if (this.state.processValue >= 100) {
                // complete spec. and reset progress
                completeSpecList = this.state.specList.filter(spec => {
                    return spec.stageLevel >= 4
                });
                var specList = this.state.specList.filter(spec => {
                    return spec.stageLevel < 4
                });
                this.setState({
                    beginYear: this.state.beginYear + 1,
                    processValue: 0,
                    specList: specList
                });
                // finish roop
                if (specList.length === 0) {
                    clearInterval(this.time);
                }
                return;
            }
            this.setState({
                processValue: this.state.processValue + 10
            });

            // 2コづつ
            range(Math.min(this.state.specList.length, 2)).map((index) => {
                if (this.state.specList[index] && this.state.specList[index].stageLevel < 4) {
                    this.state.specList[index].stageLevel += randomUp();
                }
            });
        }, 1000);
    }

    onSubmit(event) {
        event.preventDefault();
        var value = React.findDOMNode(this.refs.inputSpecTitle).value;
        var specList = this.state.specList;
        specList.push({
            name: value,
            stageLevel: 0
        });
        this.setState({
            specList: specList
        });
        React.findDOMNode(this.refs.inputSpecTitle).value = "";
    }

    onClickStart() {
        this.start();
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
        var specs = range(Math.min(this.state.specList.length, 2)).map((dummy, index) => {
            var xSpecItemRange = linear().domain(TenPercent).range([150 * (index + 1), 500]);
            var ySpecItemRange = linear().domain(TenPercent).range([0, 500]);
            var specItem = this.state.specList[index];
            return <SpecItem key={specItem.name}
                             proposalName={specItem.name}
                             stageLevel={specItem.stageLevel}
                             xRange={xSpecItemRange} yRange={ySpecItemRange}
                             width={150}
            />;
        });
        return <div className="App">
            <svg viewBox="0 0 800 600"
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
            <div className="ControlApp">
                <button onClick={this.onClickStart.bind(this)}>Start Process</button>
                |
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="inputSpecTitle"></input>
                    <input type="submit" value="Add Proposal"></input>
                </form>
            </div>
        </div>
    }
}

React.render(<App />, document.body);
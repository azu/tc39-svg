// LICENSE : MIT
"use strict";
import React from "react"
import StageLabel from "./svg/StageLabel"
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
        return <svg className="App" viewBox="0 0 500 500">
            <title>viewBoxのサンプル1</title>
            <SpecItem x={200} stageLevel={this.state.stageLevel}/>
            <StageLabel />
            <StageArea />
        </svg>
    }
}

React.render(<App />, document.body);
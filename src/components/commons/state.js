import { observable, observer } from "mobx"

export const appState = observable({
    posts: []
})

@observer class Timer {
    render() {
        return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
    }
};

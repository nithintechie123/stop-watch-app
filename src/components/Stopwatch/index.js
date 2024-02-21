import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {timeElapsedInSeconds: 0, isTimerRunning: false}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onClickStart = () => {
    this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    this.setState({isTimerRunning: true})
  }

  onClickStop = () => {
    this.clearTimerInterval()
    this.setState({isTimerRunning: false})
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState({timeElapsedInSeconds: 0, isTimerRunning: false})
  }

  renderElapsedTimeInTimeFormat = () => {
    const {timeElapsedInSeconds} = this.state

    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = timeElapsedInSeconds % 60

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiesSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiesSeconds}`
  }

  renderStopwatch = () => {
    const {isTimerRunning} = this.state

    return (
      <div className="stopwatch-container">
        <div className="timer-image-label-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
            alt="stopwatch"
            className="timer-icon"
          />
          <h1 className="timer-label">Timer</h1>
        </div>
        <h1 className="display-mins-secs-heading">
          {this.renderElapsedTimeInTimeFormat()}
        </h1>
        <div className="buttons-container">
          <button
            type="button"
            className="time-control-button bg-green"
            onClick={this.onClickStart}
            disabled={isTimerRunning}
          >
            Start
          </button>
          <button
            type="button"
            className="time-control-button bg-red"
            onClick={this.onClickStop}
          >
            Stop
          </button>
          <button
            type="button"
            className="time-control-button bg-yellow"
            onClick={this.onClickReset}
          >
            Reset
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="stopwatch-and-title-container">
          <h1 className="main-heading">Stopwatch</h1>
          {this.renderStopwatch()}
        </div>
      </div>
    )
  }
}

export default Stopwatch

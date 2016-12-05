import * as React from 'react';

export interface TimerProps {
  children?: (hours: number, minutes: number) => JSX.Element;
}

export interface TimerState {
  hours: number;
  minutes: number;
}

export default class Timer extends React.Component<TimerProps, TimerState> {
  private interval: number;

  constructor() {
    super();
    this.state = this.getTime();
  }

  public componentDidMount() {
    this.interval = setInterval(this.setTime.bind(this), 100);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    return (
      this.props.children &&
      this.props.children(this.state.hours, this.state.minutes)
    );
  }

  private getTime(): TimerState {
    const now = new Date();
    const hours = ((now.getHours() + 11) % 12 + 1);
    const minutes = now.getMinutes();

    return { hours, minutes };
  }

  private setTime() {
    const time = this.getTime();

    if (time.minutes !== this.state.minutes || time.hours !== this.state.hours) {
      this.setState(time);
    }
  }
}

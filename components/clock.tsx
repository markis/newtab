import * as React from 'react';

export declare interface IClockProps {
  hours: number;
  minutes: number;
}

export default class Clock extends React.Component<IClockProps, any> {
  render() {
    const { hours, minutes } = this.props;

    return (
      <time>{hours}:{this._padZeros(minutes)}</time>
    )
  }

  private _padZeros(value: number): string {
    const str = "" + value;
    const pad = "00"
    return pad.substring(0, pad.length - str.length) + str;
  }
}

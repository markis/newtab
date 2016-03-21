import * as React from 'react';

export declare interface IBackgroundProps {
  backgroundUrl: string;
}

export default class Background extends React.Component<IBackgroundProps, any> {
  render() {
    const { backgroundUrl } = this.props;
    const style = { backgroundImage: `url('${backgroundUrl}')` };
    return (
      <header className="hero-image fade in" style={style}>
        {this.props.children}
      </header>
    )
  }
}

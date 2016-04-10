import * as React from 'react';

export declare interface BackgroundProps {
  backgroundUrl: string;
}

export default class Background extends React.Component<BackgroundProps, void> {
  render() {
    const { backgroundUrl } = this.props;
    const style = { backgroundImage: `url('${backgroundUrl}')` };
    return (
      <header className="hero-image fade in" style={style}>
        {this.props.children}
      </header>
    );
  }
}

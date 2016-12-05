import * as React from 'react';

export declare interface HeroImageProps {
  backgroundUrl: string;
}

export default class HeroImage extends React.Component<HeroImageProps, void> {
  public render() {
    const { backgroundUrl } = this.props;
    const style = { backgroundImage: `url('${backgroundUrl}')` };
    return (
      <header className='hero-image fade in' style={style}>
        {this.props.children}
      </header>
    );
  }
}

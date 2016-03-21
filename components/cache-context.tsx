import { cache } from '../utilities/cache';
import * as React from 'react';

export interface ICacheContextProps {
  cacheKey: string;
  defaultValue?: any;
}

export default class CacheContext extends React.Component<ICacheContextProps, any>{
  constructor(props: ICacheContextProps) {
    super(props);
    this.state = { data: this.props.defaultValue };
  }

  componentDidMount() {
    cache.getItem(this.props.cacheKey).then((value: any) => {
      if (value === null) {
        this.setState({data: this.props.defaultValue });
      } else {
        this.setState({data: value});
      }
    });
  }

  render() {
    const childRender: any = this.props['children'];
    return (
      childRender(this.state.data)
    )
  }
}

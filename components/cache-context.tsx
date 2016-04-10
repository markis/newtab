import { cache } from '../utilities/cache';
import * as React from 'react';

export interface CacheContextProps<T> extends React.Props<CacheContext<T>> {
  cacheKey: string;
  defaultValue?: T;
  children?: (data: T) => JSX.Element;
}

export interface CacheContextState<T> {
  data: T;
}

export default class CacheContext<T> extends React.Component<CacheContextProps<T>, CacheContextState<T>>{
  constructor(props: CacheContextProps<T>) {
    super(props);
    this.state = { data: this.props.defaultValue };
  }

  componentDidMount() {
    cache.getItem<T>(this.props.cacheKey).then(value => {
      if (!value) {
        this.setState({data: this.props.defaultValue });
      } else {
        this.setState({data: value});
      }
    });
  }

  render() {
    return (
      this.props.children && 
      this.props.children(this.state.data)
    );
  }
}

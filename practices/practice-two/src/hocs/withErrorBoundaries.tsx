import React, { FunctionComponent, Component } from 'react';

// Component
import { Error } from 'components';

export const withErrorBoundaries = <T extends object>(
  WrappedComponent: FunctionComponent<T>
) => {
  class Wrapper extends Component<T, { hashError: boolean }> {
    constructor(props: T) {
      super(props);
      this.state = {
        hashError: false,
      };
    }

    componentDidCatch(): void {
      this.setState({
        hashError: true,
      });
    }

    render(): React.ReactNode {
      if (this.state.hashError) {
        return <Error />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return Wrapper;
};

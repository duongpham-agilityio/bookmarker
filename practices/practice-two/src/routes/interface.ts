import { FunctionComponent } from 'react';

export interface Route {
  path: string;
  component: FunctionComponent;
  isRequired?: boolean;
}

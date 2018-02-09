import React, {Component} from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const ReactLoadable = Loadable({
  loader: () => import('./Example'),
  loading: Loading,
});

export default class App extends Component {
  render() {
    return (
        <main suppressHydrationWarning={true}>
          <ReactLoadable/>
        </main>
    );
  }

}

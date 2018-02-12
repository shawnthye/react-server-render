import React, {Component, Fragment} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loading';

const Example = Loadable({
  loader: () => import('./components/Example'),
  loading: Loading,
});

const Example2 = Loadable({
  loader: () => import('./components/Example2'),
  loading: Loading,
});

export default class App extends Component {
  render() {
    return (
        <Fragment>
          <Link to="/">A</Link>
          <Link to="/example2">B</Link>

          <Switch>
            <Route path="/" component={Example}/>
            <Route path="/example2" component={Example2}/>
          </Switch>
        </Fragment>
    );
  }

}

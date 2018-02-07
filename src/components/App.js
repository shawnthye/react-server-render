import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import asyncComponent from './../AsyncComponent'
// import Example from './Example'

const LoadableExample = Loadable({
  loader: () => import('./Example'),
  loading: Loading,
});

const AsyncExample = () => asyncComponent(() => import('./Example'));

export default function App() {
  return <div>
    <section>
      <h1>Loadable</h1>
      <p><LoadableExample/></p>
    </section>

    <section>
      <h1>AsyncExample</h1>
      <p><AsyncExample/></p>
    </section>
  </div>;

}

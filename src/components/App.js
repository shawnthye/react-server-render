import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const ReactLoadable = Loadable({
  loader: () => import('./Example'),
  loading: Loading,
});

export default function App() {
  return <div>
    <section>
      <h1>React Loadable</h1>
      <p><ReactLoadable/></p>
    </section>
  </div>;

}

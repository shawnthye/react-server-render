import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter, Route} from 'react-router-dom'
import App from './components/App';

{/*<BrowserRouter><Route path="/" component={App}/></BrowserRouter>*/
}
if (typeof window !== 'undefined') {
  ReactDOM.render(
      <App/>
      , document.getElementById('root'));
}


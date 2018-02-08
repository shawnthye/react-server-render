import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import App from './components/App';

if (typeof window !== 'undefined') {
  ReactDOM.render(
      <BrowserRouter><Route path="/" component={App}/></BrowserRouter>
      , document.getElementById('root'));
}


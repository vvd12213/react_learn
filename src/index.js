import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { Header } from './components/Header/Header';

//Подключили роутинг
import { BrowserRouter } from "react-router-dom";

// const el2 = React.createElement('h1', {}, 'Hello React.js in child')
// const element = React.createElement('div', {}, el2)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // element

  // Подключили роутинг
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // <Elem />,
  // <HeaderV3 />
);
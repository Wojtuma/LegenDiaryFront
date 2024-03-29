import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import reportWebVitals from './reportWebVitals';
import './index.css';
import RouterReact from './RouterReact';
 
ReactDOM.render(
<React.StrictMode>
<RouterReact />
</React.StrictMode>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

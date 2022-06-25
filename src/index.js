/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-24 22:58:27
 * @LastEditTime: 2022-06-26 00:14:45
 * @FilePath: /strongbox/src/index.js
 * @Description: 
 * @Encoding: UTF-8
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

document.body.style.backgroundColor = "#EBEBEB";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

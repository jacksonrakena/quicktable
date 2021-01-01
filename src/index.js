import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import reportWebVitals from './reportWebVitals';
import "react-datepicker/dist/react-datepicker.css"

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

let currentVersion = process.env.REACT_APP_COMMIT_REF;

if (process.env.NODE_ENV === "production") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      fetch(`/version.txt?_=${Date.now()}`)
    .then(res => res.text())
    .then(latestVersion => {
 
      console.log('latest: ' + latestVersion)
      console.log('current: ' + currentVersion)
      if (latestVersion.trim() !== currentVersion.trim()) {
        console.log('reloading')
        window.location.reload(true);
      }
    });
    }
  });
}

import React from 'react';
import ReactDOM from 'react-dom';

var App = () => {
  return (
    <div>
      <h1>App.jsx is rendering</h1>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('app'));
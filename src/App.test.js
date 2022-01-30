import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// https://stackoverflow.com/questions/48828759/unit-test-raises-error-because-of-getcontext-is-not-implemented
HTMLCanvasElement.prototype.getContext = () => { 
  // return whatever getContext has to return
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

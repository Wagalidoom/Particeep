import './App.css';
import HomePage from './Components/HomePage';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store/configureStore.js';

function App() {
  return (
    <Provider store={Store}>
      <div className="App-header">
        <HomePage/>
      </div>
    </Provider>
  );
}

export default App;

import React from 'react';
import './App.css';
import { AppProvider } from './providers/AppProvider';
import Router from './Router';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Router />
      </AppProvider>
    </div>
  );
}

export default App;

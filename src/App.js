import React from 'react';
import logo from './assets/images/logo.jpeg'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <p>Hello, EzCars Developers!</p>
        <img src={logo} alt="EzCars Logo" style={{width: '100px', height: 'auto'}} />
      </header>
    </div>
  );
}

export default App;
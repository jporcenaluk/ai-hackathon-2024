import React, { useState } from 'react';
import "./App.css"

function App() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle button click
  const handleClick = () => {
    const requestOptions = {
      method: 'POST', // Setting the method to POST
      headers: {
        'Content-Type': 'application/json' // Specifying JSON content type
      },
      body: JSON.stringify({
        prompt: inputValue
      })
    };

    fetch('https://55b1-82-198-128-243.ngrok-free.app/ask', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(apiResponse => setApiResponse(apiResponse.message))
      .catch(error => setError(error.message));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src="/assets/furrows.png" alt="Logo" className="logo"/>  {/* Logo on the left */}
          <button className="hamburger-menu">☰</button>
        </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Location?"
      />
      <button onClick={handleClick}>Generate Report</button>
        {error && <p>Error: {error}</p>} 
        {apiResponse && <p>Response: {apiResponse}</p>}
        {apiResponse && <p>fun</p>}
      </header>
    </div>
  );
}

export default App;

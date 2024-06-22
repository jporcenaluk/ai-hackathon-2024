import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data.message))
      .catch(error => setError(error.message));
  }, []);

  // Function to handle button click
  const handleClick = () => {
    fetch('http://localhost:8000/api/llm')
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
        {error ? <p>Error: {error}</p> : <p>{data ? data : 'Loading...'}</p>}
        {/* Button that calls handleClick when it is clicked */}
        <button onClick={handleClick}>Click Me!</button>
        {<p>Response: {apiResponse}</p>}
      </header>
    </div>
  );
}

export default App;

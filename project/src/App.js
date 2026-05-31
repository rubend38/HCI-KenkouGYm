// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import MainMenu from './MainMenu';
import './App.css';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath === '/MainMenu') {
    return <MainMenu />;
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p className="App-name"> KENKOU-Gym </p>
        <p className="App-welcome"> Welcome back </p>
        <p className="App-username"> Juan! </p>

        {/* <a
          className="App-link"
          href="/MainMenu"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/MainMenu');
            setCurrentPath('/MainMenu');
          }}
        >
          Go to Main Menu
        </a> */}
      </header>
      <div className="App-buttons">
        <button
          className="App-button1"
          onClick={() => {
            window.history.pushState({}, '', '/MainMenu');
            setCurrentPath('/MainMenu');
          }}
        >
          Start Workout
        </button>

                <button
          className="App-button2"
          onClick={() => {
            window.history.pushState({}, '', '/MainMenu');
            setCurrentPath('/MainMenu');
          }}
        >
          View workout log
        </button>

                <button
          className="App-button3"
          onClick={() => {
            window.history.pushState({}, '', '/MainMenu');
            setCurrentPath('/MainMenu');
          }}
        >
          Browse new workout routines
        </button>

                <button
          className="App-button4"
          onClick={() => {
            window.history.pushState({}, '', '/MainMenu');
            setCurrentPath('/MainMenu');
          }}
        >
          Design new workout routine
        </button>

      </div>
    </div>
  );
}

export default App;
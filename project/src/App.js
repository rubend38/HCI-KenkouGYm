// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import MainMenu from './MainMenu';
import SelectRoutine from './SelectRoutine';
import PushDayEasy from './PushDayEasy';
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

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (currentPath === '/MainMenu') {
    return <MainMenu />;
  }

  if (currentPath === '/SelectRoutine') {
    return <SelectRoutine onBack={() => navigate('/')} onNavigate={navigate} />;
  }

  if (currentPath === '/PushDayEasy') {
    return <PushDayEasy onBack={() => navigate('/SelectRoutine')} onAddExercise={() => {}} />;
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
          onClick={() => navigate('/SelectRoutine')}
        >
          Start Workout
        </button>

                <button
          className="App-button2"
          onClick={() => navigate('/MainMenu')}
        >
          View workout log
        </button>

        <button
          className="App-button3"
          onClick={() => navigate('/MainMenu')}
        >
          Browse new workout routines
        </button>

        <button
          className="App-button4"
          onClick={() => navigate('/MainMenu')}
        >
          Design new workout routine
        </button>

      </div>
    </div>
  );
}

export default App;
// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import MainMenu from './MainMenu';
import SelectRoutine from './SelectRoutine';
import PushDayEasy from './PushDayEasy';
import ExerciseLog from './ExerciseLog';
import TodaysAccomplishments from './TodaysAccomplishments';
import './App.css';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [exerciseLogs, setExerciseLogs] = useState([]);

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
    return (
      <PushDayEasy
        onBack={() => navigate('/SelectRoutine')}
        onAddExercise={() => {}}
        onSelectExercise={(name) => { setSelectedExercise(name); navigate('/ExerciseLog'); }}
        onEndSession={() => navigate('/TodaysAccomplishments')}
        completedExercises={completedExercises}
      />
    );
  }

  if (currentPath === '/ExerciseLog') {
    return (
      <ExerciseLog
        exerciseName={selectedExercise}
        onEndExercise={(sets) => {
          setCompletedExercises(prev => new Set([...prev, selectedExercise]));
          setExerciseLogs(prev => {
            const existing = prev.findIndex(l => l.name === selectedExercise);
            if (existing !== -1) {
              return prev.map((l, i) => i === existing ? { name: selectedExercise, sets } : l);
            }
            return [...prev, { name: selectedExercise, sets }];
          });
          navigate('/PushDayEasy');
        }}
      />
    );
  }

  if (currentPath === '/TodaysAccomplishments') {
    return (
      <TodaysAccomplishments
        exerciseLogs={exerciseLogs}
        routineName="Push Day (Chest and Triceps)"
        onGoHome={() => {
          setCompletedExercises(new Set());
          setExerciseLogs([]);
          navigate('/');
        }}
      />
    );
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
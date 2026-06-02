// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import SelectRoutine from './SelectRoutine';
import PushDayEasy from './PushDayEasy';
import ExerciseLog from './ExerciseLog';
import TodaysAccomplishments from './TodaysAccomplishments';
import './App.css';
import DesignRoutine from './DesignRoutine';
import RoutineCreated from './RoutineCreated';
import ViewCreatedRoutine from './ViewCreatedRoutine';
import BrowseRoutines from './BrowseRoutines';
import ViewRoutineDetails from './ViewRoutineDetails';
import WorkoutLog from './WorkoutLog';
import MonthlyReport from './MonthlyReport';
import AdjustGoals from './AdjustGoals';
import WorkoutTracker from './WorkoutTracker';

const ROUTINES = {
  '/PushDayEasy': {
    name: 'Push Day (Chest and Triceps)',
    exercises: [
      { name: 'Push Ups', recommended: '3 sets · 12 reps' },
      { name: 'Chest Flies', recommended: '3 sets · 12 reps' },
      { name: 'Incline Bench Press', recommended: '3 sets · 12 reps' },
    ],
  },
  '/PushDayModerate': {
    name: 'Push Day (Chest and Triceps)',
    exercises: [
      { name: 'Bench Press', recommended: '4 sets · 10 reps' },
      { name: 'Incline Dumbbell Press', recommended: '4 sets · 10 reps' },
      { name: 'Tricep Pushdown', recommended: '4 sets · 12 reps' },
      { name: 'Cable Chest Flies', recommended: '4 sets · 12 reps' },
    ],
  },
  '/PullDayEasy': {
    name: 'Pull Day (Back and Biceps)',
    exercises: [
      { name: 'Lat Pulldown', recommended: '3 sets · 12 reps' },
      { name: 'Seated Cable Row', recommended: '3 sets · 12 reps' },
      { name: 'Dumbbell Curl', recommended: '3 sets · 12 reps' },
    ],
  },
  '/PullDayModerate': {
    name: 'Pull Day (Back and Biceps)',
    exercises: [
      { name: 'Pull-Ups', recommended: '4 sets · 8 reps' },
      { name: 'Barbell Row', recommended: '4 sets · 10 reps' },
      { name: 'Face Pulls', recommended: '4 sets · 15 reps' },
      { name: 'Hammer Curl', recommended: '4 sets · 12 reps' },
    ],
  },
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [activeRoutinePath, setActiveRoutinePath] = useState('/PushDayEasy');
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [createdRoutine, setCreatedRoutine] = useState({muscles: [], exercises: {},});
  const [selectedRoutineDetails, setSelectedRoutineDetails] = useState(null);
  const [reportMonth, setReportMonth] = useState('March 2026');
  const [trackedWorkout, setTrackedWorkout] = useState(null);
  const [personalGoals, setPersonalGoals] = useState({
    weeklyTarget: 4,
    sessionMinutes: 50,
    primaryMuscle: 'Chest',
    monthlyTarget: 16,
  });

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

  const navigateToRoutine = (path) => {
    setActiveRoutinePath(path);
    setCompletedExercises(new Set());
    setExerciseLogs([]);
    navigate(path);
  };

  if (currentPath === '/SelectRoutine') {
    return <SelectRoutine onBack={() => navigate('/')} onNavigate={navigateToRoutine} />;
  }

  const activeRoutine = ROUTINES[currentPath];
  if (activeRoutine) {
    return (
      <PushDayEasy
        onBack={() => navigate('/SelectRoutine')}
        onAddExercise={() => {}}
        onSelectExercise={(name) => { setSelectedExercise(name); navigate('/ExerciseLog'); }}
        onEndSession={() => navigate('/TodaysAccomplishments')}
        completedExercises={completedExercises}
        exercises={activeRoutine.exercises}
        routineName={activeRoutine.name}
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
          navigate(activeRoutinePath);
        }}
      />
    );
  }

  if (currentPath === '/TodaysAccomplishments') {
    const routine = ROUTINES[activeRoutinePath];
    return (
      <TodaysAccomplishments
        exerciseLogs={exerciseLogs}
        routineName={routine ? routine.name : ''}
        onGoHome={() => {
          setCompletedExercises(new Set());
          setExerciseLogs([]);
          navigate('/');
        }}
      />
    );
  }

  if (currentPath === '/DesignRoutine') {
    return (
      <DesignRoutine
        onBack={() => navigate('/')}
        onRoutineCreated={(muscles, exercises) => {
          setCreatedRoutine({
            muscles,
            exercises,
          });

          navigate('/RoutineCreated');
        }}
      />
    );
  }

  if (currentPath === '/RoutineCreated') {
    return (
      <RoutineCreated
        selectedMuscles={
          createdRoutine.muscles
        }
        onViewRoutine={() =>
          navigate('/ViewRoutine')
        }
        onStartRoutine={() =>
          navigate('/StartCustomRoutine')
        }
        onCreateNewRoutine={() =>
          navigate('/DesignRoutine')
        }
        onViewOtherRoutines={() =>
          navigate('/SelectRoutine')
        }
      />
    );
  }

  if (currentPath === '/ViewRoutine') {
    return (
      <ViewCreatedRoutine
        routine={createdRoutine}
        onBack={() => navigate('/RoutineCreated')}
        onSelectExercise={(name) => {
          setSelectedExercise(name);
          navigate('/ExerciseLog');
        }}
        onEndSession={() =>
          navigate('/TodaysAccomplishments')
        }
        completedExercises={completedExercises}
      />
    );
  }
if (currentPath === '/BrowseRoutines') {
  return (
    <BrowseRoutines
      onBack={() => navigate('/')}
      onViewRoutine={(routine) => {
        setSelectedRoutineDetails(routine);
        navigate('/ViewRoutineDetails');
      }}
    />
  );
}
if (currentPath === '/ViewRoutineDetails') {
  return (
    <ViewRoutineDetails
      routine={selectedRoutineDetails}
      onBack={() => navigate('/BrowseRoutines')}
    />
  );
}

  if (currentPath === '/WorkoutLog') {
    return (
      <WorkoutLog
        onBack={() => navigate('/')}
        onViewReport={(month) => {
          setReportMonth(month);
          navigate('/MonthlyReport');
        }}
        onViewTracker={(workout) => {
          setTrackedWorkout(workout);
          navigate('/WorkoutTracker');
        }}
      />
    );
  }

  if (currentPath === '/WorkoutTracker') {
    return (
      <WorkoutTracker
        workout={trackedWorkout}
        onBack={() => navigate('/WorkoutLog')}
      />
    );
  }

  if (currentPath === '/MonthlyReport') {
    return (
      <MonthlyReport
        initialMonth={reportMonth}
        onBack={() => navigate('/WorkoutLog')}
        onAdjustGoals={() => navigate('/AdjustGoals')}
      />
    );
  }

  if (currentPath === '/AdjustGoals') {
    return (
      <AdjustGoals
        initialGoals={personalGoals}
        onBack={() => navigate('/MonthlyReport')}
        onSave={(goals) => {
          setPersonalGoals(goals);
          // eslint-disable-next-line no-alert
          alert('Goals saved!');
          navigate('/MonthlyReport');
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
          onClick={() => navigate('/WorkoutLog')}
        >
          View workout log
        </button>

        <button
          className="App-button3"
          onClick={() => navigate('/BrowseRoutines')}
        >
          Browse new workout routines
        </button>

        <button
          className="App-button4"
          onClick={() => navigate('/DesignRoutine')}
        >
          Design new workout routine
        </button>

      </div>
    </div>
  );
}

export default App;
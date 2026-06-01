import { useState } from 'react';
import './BrowseRoutines.css';

function BrowseRoutines({ onBack, onViewRoutine }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const routines = [
    {
      name: 'Push Day Easy',
      route: '/PushDayEasy',
      difficulty: 'Beginner',
      goal: 'Strength',
      duration: '30 minutes',
      focus: 'Chest and triceps',
      exercises: ['Push Ups', 'Chest Flies', 'Incline Bench Press'],
    },
    {
      name: 'Pull Day Easy',
      route: '/PullDayEasy',
      difficulty: 'Beginner',
      goal: 'Strength',
      duration: '30 minutes',
      focus: 'Back and biceps',
      exercises: ['Pull Ups', 'Lat Pulldowns', 'Barbell Rows'],
    },
    {
      name: 'Push Day Moderate',
      route: '/PushDayModerate',
      difficulty: 'Intermediate',
      goal: 'Strength',
      duration: '50 minutes',
      focus: 'Chest and triceps',
        exercises: ['Bench Press', 'Incline Dumbbell Press', 'Tricep Pushdown', 'Cable Chest Flies'],
    },
    {
      name: 'Pull Day Moderate',
        route: '/PullDayModerate',
      difficulty: 'Intermediate',
      goal: 'Strength',
      duration: '50 minutes',
      focus: 'Back and biceps',
        exercises: ['Pull-Ups', 'Barbell Row', 'Face Pulls', 'Hammer Curl'],
    },
  ];

  const filteredRoutines = routines.filter((routine) => {
    const matchesSearch = routine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === 'All' ||
      routine.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="br-container">
      <button className="br-back-btn" onClick={onBack}>BACK</button>

      <h1 className="br-title">Browse Workout Routines</h1>

      <p className="br-subtitle">
        Explore new routines based on your experience level and training goal.
      </p>

      <div className="br-controls">
        <input
          type="text"
          placeholder="Search routine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="br-search"
        />

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="br-select"
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
        </select>
      </div>

      <div className="br-grid">
        {filteredRoutines.map((routine) => (
          <div className="br-card" key={routine.name}>
            <h2>{routine.name}</h2>
            <p><strong>Difficulty:</strong> {routine.difficulty}</p>
            <p><strong>Duration:</strong> {routine.duration}</p>
            <p><strong>Focus:</strong> {routine.focus}</p>

            <button className="br-btn"
                className="br-btn"
                onClick={() => onViewRoutine(routine)}
            >
              View Routine
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseRoutines;
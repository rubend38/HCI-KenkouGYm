import { useState } from 'react';
import './WorkoutLog.css';

// Mock workout history. Keys are "Month YYYY". Each entry mirrors what the
// mockups show: muscle group, duration in minutes, weekday label, and date.
const WORKOUT_HISTORY = {
  'March 2026': [
    // Week 1
    { name: 'Chest and Triceps',minutes: 50, weekday: 'Monday',    date: 'March 2, 2026' },
    { name: 'Back and Biceps',  minutes: 48, weekday: 'Wednesday', date: 'March 4, 2026' },
    { name: 'Quads and Glutes', minutes: 55, weekday: 'Friday',    date: 'March 6, 2026' },
    // Week 2
    { name: 'Chest and Triceps',minutes: 52, weekday: 'Monday',    date: 'March 9, 2026' },
    { name: 'Back and Biceps',  minutes: 45, weekday: 'Tuesday',   date: 'March 10, 2026' },
    { name: 'Abs',              minutes: 15, weekday: 'Wednesday', date: 'March 11, 2026' },
    { name: 'Quads and Glutes', minutes: 58, weekday: 'Friday',    date: 'March 13, 2026' },
    { name: 'Chest and Triceps',minutes: 50, weekday: 'Saturday',  date: 'March 14, 2026' },
    // Week 3
    { name: 'Back and Biceps',  minutes: 57, weekday: 'Monday',    date: 'March 16, 2026' },
    { name: 'Quads and Glutes', minutes: 53, weekday: 'Tuesday',   date: 'March 17, 2026' },
    { name: 'Chest and Triceps',minutes: 55, weekday: 'Wednesday', date: 'March 18, 2026' },
    { name: 'Abs',              minutes: 10, weekday: 'Thursday',  date: 'March 19, 2026' },
    // Week 4
    { name: 'Chest and Triceps',minutes: 48, weekday: 'Monday',    date: 'March 23, 2026' },
    { name: 'Back and Biceps',  minutes: 52, weekday: 'Wednesday', date: 'March 25, 2026' },
    { name: 'Quads and Glutes', minutes: 56, weekday: 'Friday',    date: 'March 27, 2026' },
    { name: 'Chest and Triceps',minutes: 45, weekday: 'Saturday',  date: 'March 28, 2026' },
  ],
  'February 2026': [
    { name: 'Push Day',  minutes: 45, weekday: 'Monday',  date: 'February 2, 2026' },
    { name: 'Pull Day',  minutes: 42, weekday: 'Wednesday', date: 'February 4, 2026' },
    { name: 'Leg Day',   minutes: 50, weekday: 'Friday',  date: 'February 6, 2026' },
  ],
  'January 2026': [
    { name: 'Full Body', minutes: 60, weekday: 'Saturday', date: 'January 10, 2026' },
    { name: 'Cardio',    minutes: 30, weekday: 'Tuesday',  date: 'January 13, 2026' },
  ],
};

const MONTHS = Object.keys(WORKOUT_HISTORY);

function WorkoutLog({ onBack, onViewReport, onViewTracker }) {
  const [selectedMonth, setSelectedMonth] = useState('March 2026');

  const workouts = WORKOUT_HISTORY[selectedMonth] || [];

  return (
    <div className="wl-container">
      <button className="wl-back-btn" onClick={onBack}>BACK</button>

      <h1 className="wl-title">Workout Log</h1>

      <div className="wl-controls">
        <select
          className="wl-month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m.toUpperCase()}</option>
          ))}
        </select>

        <button
          className="wl-report-btn"
          onClick={() => onViewReport(selectedMonth)}
        >
          View Monthly Report
        </button>
      </div>

      <div className="wl-list">
        {workouts.length === 0 ? (
          <div className="wl-empty">No workouts logged for this month.</div>
        ) : (
          workouts.map((w, i) => (
            <div key={i} className="wl-card">
              <div className="wl-card-left">
                <p className="wl-workout-name">{w.name}</p>
                <div className="wl-card-row">
                  <span className="wl-minutes">{w.minutes} mins</span>
                  <button
                    className="wl-tracker-link"
                    onClick={() => onViewTracker(w)}
                  >
                    View tracker
                  </button>
                </div>
              </div>
              <div className="wl-card-right">
                <p className="wl-weekday">{w.weekday}</p>
                <p className="wl-date">{w.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WorkoutLog;
export { WORKOUT_HISTORY };

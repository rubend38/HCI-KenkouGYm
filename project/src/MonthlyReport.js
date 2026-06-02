import { useState } from 'react';
import './MonthlyReport.css';
import { WORKOUT_HISTORY } from './WorkoutLog';

const MONTHS = Object.keys(WORKOUT_HISTORY);

// Group workouts in a month into weekly buckets (1..5) using the day-of-month.
function workoutsPerWeek(workouts) {
  const buckets = [0, 0, 0, 0, 0];
  workouts.forEach((w) => {
    // Pull "March 16, 2026" -> day = 16
    const match = w.date.match(/\s(\d{1,2}),/);
    if (!match) return;
    const day = parseInt(match[1], 10);
    const weekIndex = Math.min(4, Math.floor((day - 1) / 7));
    buckets[weekIndex] += 1;
  });
  // Drop trailing zero week if it's empty just to keep the chart tidy
  while (buckets.length > 4 && buckets[buckets.length - 1] === 0) {
    buckets.pop();
  }
  return buckets;
}

function summarize(workouts) {
  const totalMinutes = workouts.reduce((sum, w) => sum + w.minutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  const counts = {};
  workouts.forEach((w) => {
    counts[w.name] = (counts[w.name] || 0) + 1;
  });

  let mostTrained = '-';
  let maxCount = 0;
  Object.entries(counts).forEach(([name, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostTrained = name;
    }
  });

  return {
    totalWorkouts: workouts.length,
    totalHours,
    mostTrained,
  };
}

function MonthlyReport({ initialMonth, onBack, onAdjustGoals }) {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth || 'March 2026');

  const workouts = WORKOUT_HISTORY[selectedMonth] || [];
  const summary = summarize(workouts);
  const weekly = workoutsPerWeek(workouts);
  const maxWeekly = Math.max(...weekly, 1);

  return (
    <div className="mr-container">
      <button className="mr-back-btn" onClick={onBack}>BACK</button>

      <h1 className="mr-title">Monthly Report</h1>

      <div className="mr-month-row">
        <select
          className="mr-month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <h2 className="mr-section-label">Summary</h2>
      <div className="mr-card">
        <p className="mr-stat"><strong>Total Workouts:</strong> {summary.totalWorkouts}</p>
        <p className="mr-stat"><strong>Total Time:</strong> {summary.totalHours} hrs</p>
        <p className="mr-stat"><strong>Most Trained:</strong> {summary.mostTrained}</p>
      </div>

      <h2 className="mr-section-label">Progress</h2>
      <div className="mr-card mr-chart-card">
        <p className="mr-chart-title">Workouts per week</p>
        <div className="mr-chart">
          {weekly.map((count, i) => (
            <div className="mr-bar-column" key={i}>
              <div className="mr-bar-wrap">
                <div
                  className="mr-bar"
                  style={{ height: `${(count / maxWeekly) * 100}%` }}
                >
                  <span className="mr-bar-value">{count}</span>
                </div>
              </div>
              <span className="mr-bar-label">Week {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mr-footer">
        <button className="mr-adjust-btn" onClick={onAdjustGoals}>
          Adjust Goals
        </button>
      </div>
    </div>
  );
}

export default MonthlyReport;

import { useState } from 'react';
import './AdjustGoals.css';

const MUSCLE_OPTIONS = [
  'Chest',
  'Back',
  'Biceps',
  'Triceps',
  'Shoulders',
  'Quads',
  'Hamstrings',
  'Glutes',
  'Abs',
  'Cardio',
];

function Stepper({ unitLabel, value, min, max, step, onChange }) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));

  return (
    <div className="ag-stepper">
      <span className="ag-unit-label">{unitLabel}</span>
      <button className="ag-step-btn" onClick={dec}>-</button>
      <span className="ag-step-value">{value}</span>
      <button className="ag-step-btn" onClick={inc}>+</button>
    </div>
  );
}

function AdjustGoals({ initialGoals, onBack, onSave }) {
  const defaults = initialGoals || {
    weeklyTarget: 4,
    sessionMinutes: 50,
    primaryMuscle: 'Chest',
    monthlyTarget: 16,
  };

  const [weekly, setWeekly] = useState(defaults.weeklyTarget);
  const [minutes, setMinutes] = useState(defaults.sessionMinutes);
  const [muscle, setMuscle] = useState(defaults.primaryMuscle);
  const [monthly, setMonthly] = useState(defaults.monthlyTarget);

  const handleSave = () => {
    onSave({
      weeklyTarget: weekly,
      sessionMinutes: minutes,
      primaryMuscle: muscle,
      monthlyTarget: monthly,
    });
  };

  return (
    <div className="ag-container">
      <button className="ag-back-btn" onClick={onBack}>BACK</button>

      <h1 className="ag-title">Adjust Personal Goals</h1>

      <div className="ag-form">
        <div className="ag-field">
          <label className="ag-label">Weekly Workout Target</label>
          <Stepper
            unitLabel="workouts/week"
            value={weekly}
            min={1}
            max={14}
            step={1}
            onChange={setWeekly}
          />
        </div>

        <div className="ag-field">
          <label className="ag-label">Session Duration Goal</label>
          <Stepper
            unitLabel="minutes"
            value={minutes}
            min={10}
            max={180}
            step={5}
            onChange={setMinutes}
          />
        </div>

        <div className="ag-field">
          <label className="ag-label">Primary Muscle Focus</label>
          <div className="ag-select-row">
            <span className="ag-unit-label">muscle group</span>
            <select
              className="ag-muscle-select"
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
            >
              {MUSCLE_OPTIONS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="ag-field">
          <label className="ag-label">Monthly Workout Target</label>
          <Stepper
            unitLabel="workouts/month"
            value={monthly}
            min={1}
            max={60}
            step={1}
            onChange={setMonthly}
          />
        </div>

        <button className="ag-save-btn" onClick={handleSave}>
          Save Goals
        </button>
      </div>
    </div>
  );
}

export default AdjustGoals;

import { useState, useEffect, useRef } from 'react';
import './ExerciseLog.css';

const SETS_COUNT = 3;

function SetRow({ setNumber, reps, weight, onChangeReps, onChangeWeight }) {
  return (
    <div className="el-set-block">
      <p className="el-set-label">Set {setNumber}</p>
      <div className="el-set-card">
        <div className="el-set-row">
          <span className="el-set-field-label">Repetitions</span>
          <div className="el-counter">
            <button className="el-counter-btn" onClick={() => onChangeReps(-1)}>-</button>
            <span className="el-counter-value">{reps}</span>
            <button className="el-counter-btn" onClick={() => onChangeReps(1)}>+</button>
          </div>
        </div>
        <div className="el-set-row">
          <span className="el-set-field-label">Weight{'\n'}(optional)</span>
          <div className="el-counter">
            <button className="el-counter-btn" onClick={() => onChangeWeight(-1)}>-</button>
            <span className="el-counter-value">{weight}</span>
            <button className="el-counter-btn" onClick={() => onChangeWeight(1)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExerciseLog({ exerciseName, onEndExercise }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);

  const [sets, setSets] = useState(
    Array.from({ length: SETS_COUNT }, () => ({ reps: 12, weight: 0 }))
  );

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (total) => {
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleTimerToggle = () => {
    if (!started) {
      setStarted(true);
      setRunning(true);
    } else {
      setRunning(r => !r);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setStarted(false);
    setSeconds(0);
  };

  const timerLabel = !started ? 'Start' : running ? 'Pause' : 'Resume';

  const changeSet = (index, field, delta) => {
    setSets(prev =>
      prev.map((set, i) =>
        i === index
          ? { ...set, [field]: Math.max(0, set[field] + delta) }
          : set
      )
    );
  };

  return (
    <div className="el-container">
      <div className="el-header">
        <div className="el-timer-controls">
          <button className="el-timer-btn" onClick={handleTimerToggle}>
            {timerLabel}
          </button>
          <button className="el-timer-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <p className="el-timer">{formatTime(seconds)}</p>
      <p className="el-exercise-name">Selected: {exerciseName}</p>

      <p className="el-record-label">Record to Beat</p>
      <div className="el-record-box">
        <p className="el-record-text">Last time you did 4 sets of 10 reps</p>
      </div>

      {sets.map((set, i) => (
        <SetRow
          key={i}
          setNumber={i + 1}
          reps={set.reps}
          weight={set.weight}
          onChangeReps={delta => changeSet(i, 'reps', delta)}
          onChangeWeight={delta => changeSet(i, 'weight', delta)}
        />
      ))}

      <div className="el-footer">
        <button className="el-end-btn" onClick={onEndExercise}>End Exercise</button>
      </div>
    </div>
  );
}

export default ExerciseLog;

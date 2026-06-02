import './WorkoutTracker.css';

// Mock exercise breakdowns keyed by the workout's muscle-group name.
// Each entry: list of exercises, each with sets of {reps, weight}.
// weight of 0 is rendered as "bodyweight".
const EXERCISE_TEMPLATES = {
  'Back and Biceps': [
    { name: 'Lat Pulldown',     sets: [{ reps: 12, weight: 80 },  { reps: 12, weight: 85 },  { reps: 10, weight: 90 }] },
    { name: 'Seated Cable Row', sets: [{ reps: 12, weight: 100 }, { reps: 10, weight: 110 }, { reps: 8,  weight: 115 }] },
    { name: 'Barbell Curl',     sets: [{ reps: 12, weight: 40 },  { reps: 10, weight: 45 },  { reps: 8,  weight: 50 }] },
    { name: 'Hammer Curl',      sets: [{ reps: 12, weight: 25 },  { reps: 12, weight: 25 },  { reps: 10, weight: 30 }] },
  ],
  'Chest and Triceps': [
    { name: 'Bench Press',            sets: [{ reps: 10, weight: 135 }, { reps: 8,  weight: 155 }, { reps: 6, weight: 165 }] },
    { name: 'Incline Dumbbell Press', sets: [{ reps: 12, weight: 45 },  { reps: 10, weight: 50 },  { reps: 8, weight: 55 }] },
    { name: 'Tricep Pushdown',        sets: [{ reps: 15, weight: 50 },  { reps: 12, weight: 55 },  { reps: 10, weight: 60 }] },
    { name: 'Chest Flies',            sets: [{ reps: 12, weight: 30 },  { reps: 12, weight: 30 },  { reps: 10, weight: 35 }] },
  ],
  'Quads and Glutes': [
    { name: 'Back Squat',            sets: [{ reps: 10, weight: 135 }, { reps: 8, weight: 155 }, { reps: 6, weight: 175 }] },
    { name: 'Leg Press',             sets: [{ reps: 12, weight: 180 }, { reps: 10, weight: 200 }, { reps: 8, weight: 220 }] },
    { name: 'Hip Thrust',            sets: [{ reps: 12, weight: 95 },  { reps: 10, weight: 115 }, { reps: 8, weight: 135 }] },
    { name: 'Bulgarian Split Squat', sets: [{ reps: 10, weight: 25 },  { reps: 10, weight: 25 },  { reps: 8, weight: 30 }] },
  ],
  'Abs': [
    { name: 'Plank',         sets: [{ reps: '45s', weight: 0 }, { reps: '45s', weight: 0 }, { reps: '60s', weight: 0 }] },
    { name: 'Crunches',      sets: [{ reps: 20, weight: 0 },    { reps: 20, weight: 0 },    { reps: 15, weight: 0 }] },
    { name: 'Russian Twist', sets: [{ reps: 20, weight: 10 },   { reps: 20, weight: 10 }] },
  ],
  'Push Day': [
    { name: 'Bench Press',     sets: [{ reps: 10, weight: 135 }, { reps: 8, weight: 155 }, { reps: 6, weight: 165 }] },
    { name: 'Shoulder Press',  sets: [{ reps: 10, weight: 65 },  { reps: 8, weight: 75 },  { reps: 6, weight: 80 }] },
    { name: 'Tricep Pushdown', sets: [{ reps: 15, weight: 50 },  { reps: 12, weight: 55 }, { reps: 10, weight: 60 }] },
  ],
  'Pull Day': [
    { name: 'Pull-Ups',     sets: [{ reps: 8, weight: 0 }, { reps: 6, weight: 0 }, { reps: 5, weight: 0 }] },
    { name: 'Barbell Row',  sets: [{ reps: 10, weight: 95 }, { reps: 8, weight: 115 }, { reps: 6, weight: 125 }] },
    { name: 'Hammer Curl',  sets: [{ reps: 12, weight: 25 }, { reps: 10, weight: 30 }, { reps: 8, weight: 35 }] },
  ],
  'Leg Day': [
    { name: 'Back Squat', sets: [{ reps: 10, weight: 135 }, { reps: 8, weight: 155 }, { reps: 6, weight: 175 }] },
    { name: 'Romanian Deadlift', sets: [{ reps: 10, weight: 115 }, { reps: 8, weight: 135 }, { reps: 6, weight: 155 }] },
    { name: 'Leg Press',  sets: [{ reps: 12, weight: 180 }, { reps: 10, weight: 200 }, { reps: 8, weight: 220 }] },
  ],
  'Full Body': [
    { name: 'Squat',        sets: [{ reps: 10, weight: 95 }, { reps: 8, weight: 115 }, { reps: 6, weight: 135 }] },
    { name: 'Bench Press',  sets: [{ reps: 10, weight: 115 }, { reps: 8, weight: 135 }, { reps: 6, weight: 145 }] },
    { name: 'Barbell Row',  sets: [{ reps: 10, weight: 95 }, { reps: 8, weight: 115 }, { reps: 6, weight: 125 }] },
  ],
  'Cardio': [
    { name: 'Treadmill', sets: [{ reps: '30 min', weight: 0 }] },
    { name: 'Bike',      sets: [{ reps: '15 min', weight: 0 }] },
  ],
};

function getExercises(workoutName) {
  if (EXERCISE_TEMPLATES[workoutName]) return EXERCISE_TEMPLATES[workoutName];
  // Fall back on a partial match (e.g. "Push Day Moderate" -> "Push Day")
  const key = Object.keys(EXERCISE_TEMPLATES).find((k) => workoutName.includes(k));
  return key ? EXERCISE_TEMPLATES[key] : [];
}

function formatWeight(w) {
  if (!w || w === 0) return 'bodyweight';
  return w + ' lbs';
}

function WorkoutTracker({ workout, onBack }) {
  if (!workout) {
    return (
      <div className="wt-container">
        <button className="wt-back-btn" onClick={onBack}>BACK</button>
        <p className="wt-empty">No workout selected.</p>
      </div>
    );
  }

  const exercises = getExercises(workout.name);
  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0);

  return (
    <div className="wt-container">
      <button className="wt-back-btn" onClick={onBack}>BACK</button>

      <h1 className="wt-title">{workout.name}</h1>
      <p className="wt-date">{workout.weekday}, {workout.date}</p>

      <div className="wt-meta">
        <div className="wt-meta-item">
          <span className="wt-meta-value">{workout.minutes}</span>
          <span className="wt-meta-label">minutes</span>
        </div>
        <div className="wt-meta-item">
          <span className="wt-meta-value">{exercises.length}</span>
          <span className="wt-meta-label">exercises</span>
        </div>
        <div className="wt-meta-item">
          <span className="wt-meta-value">{totalSets}</span>
          <span className="wt-meta-label">total sets</span>
        </div>
      </div>

      <h2 className="wt-section-label">Exercises</h2>

      {exercises.length === 0 ? (
        <p className="wt-empty">No exercise data recorded for this workout.</p>
      ) : (
        <div className="wt-exercises">
          {exercises.map((ex, i) => (
            <div className="wt-card" key={i}>
              <p className="wt-exercise-name">{ex.name}</p>
              <div className="wt-sets">
                {ex.sets.map((set, j) => (
                  <p className="wt-set-row" key={j}>
                    Set {j + 1} / {set.reps} reps / {formatWeight(set.weight)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutTracker;

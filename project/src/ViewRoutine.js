import './ViewRoutine.css';

const DEFAULT_EXERCISES = [
  { name: 'Push Ups', recommended: '3 sets · 12 reps' },
  { name: 'Chest Flies', recommended: '3 sets · 12 reps' },
  { name: 'Incline Bench Press', recommended: '3 sets · 12 reps' },
];

function ViewRoutine({
  onBack,
  onAddExercise,
  onSelectExercise,
  onEndSession,
  completedExercises = new Set(),
  exercises = DEFAULT_EXERCISES,
  routineName = 'Push Day (Chest and Triceps)',
}) {
  return (
    <div className="pde-container">
      <div className="pde-header">
        <button className="pde-back-btn" onClick={onBack}>BACK</button>
        <button className="pde-add-btn" onClick={onAddExercise}>
          <span className="pde-add-icon">+</span>
          Add New Exercise
        </button>
      </div>

      <h1 className="pde-title">View and edit only</h1>
      <h2 className="pde-subtitle">{routineName}</h2>

      <div className="pde-exercises">
        {exercises.map((ex) => {
          const done = completedExercises.has(ex.name);
          return (
            <div key={ex.name} className={`pde-card${done ? ' pde-card--done' : ''}`}>
              <div className="pde-card-info">
                <p className="pde-card-name">{ex.name}</p>
                <p className="pde-card-img">{'{Image of the Exercise}'}</p>
              </div>
              <div className="pde-card-footer">
                <p className="pde-card-recommended">Recommended:<br />{ex.recommended}</p>
                <button
                  className={`pde-select-btn${done ? ' pde-select-btn--done' : ''}`}
                  onClick={() => !done && onSelectExercise(ex.name)}
                >
                  {done ? 'Done ✓' : 'Select'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pde-button-row">
        <button className="pde-delete-btn" > Delete exercise(s)</button>
        <button className="pde-start-btn" > Start workout</button>
      </div>
    </div>
  );
}

export default ViewRoutine;

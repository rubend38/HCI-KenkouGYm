import './PushDayEasy.css';

const exercises = [
  { name: 'Push ups', recommended: '4 sets- 12reps' },
  { name: 'Chest Flies', recommended: '4 sets- 12reps' },
  { name: 'Inclined Bench Press', recommended: '4 sets- 12reps' },
];

function PushDayEasy({ onBack, onAddExercise }) {
  return (
    <div className="pde-container">
      <div className="pde-header">
        <button className="pde-back-btn" onClick={onBack}>BACK</button>
        <button className="pde-add-btn" onClick={onAddExercise}>
          <span className="pde-add-icon">+</span>
          Add New Exercise
        </button>
      </div>

      <h1 className="pde-title">Select an Exercise to Start</h1>
      <h2 className="pde-subtitle">Push Day (Chest and Triceps)</h2>

      <div className="pde-exercises">
        {exercises.map((ex) => (
          <div key={ex.name} className="pde-card">
            <div className="pde-card-info">
              <p className="pde-card-name">{ex.name}</p>
              <p className="pde-card-img">{'{Image of the Exercise}'}</p>
            </div>
            <div className="pde-card-footer">
              <p className="pde-card-recommended">Recommended:<br />{ex.recommended}</p>
              <button className="pde-select-btn">Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PushDayEasy;

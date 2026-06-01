import './TodaysAccomplishments.css';

function TodaysAccomplishments({ exerciseLogs = [], routineName = 'Push Day (Chest and Triceps)', onGoHome }) {
  return (
    <div className="ta-container">
      <h1 className="ta-title">Today's Accomplishments</h1>

      <h2 className="ta-subtitle">{routineName}</h2>

      <div className="ta-exercises">
        {exerciseLogs.length === 0 ? (
          <div className="ta-empty">No exercises completed yet.</div>
        ) : (
          exerciseLogs.map((log) => (
            <div key={log.name} className="ta-card">
              <p className="ta-exercise-name">{log.name}</p>
              <div className="ta-sets">
                {log.sets.map((set, i) => (
                  <p key={i} className="ta-set-row">
                    Set {i + 1}/ {set.reps} reps/{set.weight} lbs
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="ta-footer">
        <button className="ta-home-btn" onClick={onGoHome}>Go Home</button>
      </div>
    </div>
  );
}

export default TodaysAccomplishments;

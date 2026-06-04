import './ViewRoutineDetails.css';

function ViewRoutineDetails( {
  routine,
  onBack,
  onStartWorkout,
}) {
  return (
    <div className="vrd-container">

      <button
        className="vrd-back-btn"
        onClick={onBack}
      >
        BACK
      </button>

      <h1 className="vrd-title">
        {routine.name}
      </h1>

      <p>
        <strong>Difficulty:</strong> {routine.difficulty}
      </p>

      <p>
        <strong>Duration:</strong> {routine.duration}
      </p>

      <p>
        <strong>Focus:</strong> {routine.focus}
      </p>

      <h2>Exercises</h2>

      <ul>
        {routine.exercises.map((exercise) => (
          <li key={exercise}>
            {exercise}
          </li>
        ))}
      </ul>

      <button className="vrd-start-btn"
        onClick = {() => onStartWorkout(routine.route)}
        >
        Start Workout
      </button>

    </div>
  );
}

export default ViewRoutineDetails;
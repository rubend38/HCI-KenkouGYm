import './RoutineCreated.css';

function RoutineCreated({
  selectedMuscles = [],
  onViewRoutine,
  onStartRoutine,
  onCreateNewRoutine,
  onViewOtherRoutines,
}) {
  let muscleText = '';

  if (selectedMuscles.length === 1) {
    muscleText = selectedMuscles[0];
  } else if (selectedMuscles.length === 2) {
    muscleText =
      `${selectedMuscles[0]} and ${selectedMuscles[1]}`;
  } else {
    muscleText =
      selectedMuscles.slice(0, -1).join(', ') +
      ' and ' +
      selectedMuscles[selectedMuscles.length - 1];
  }

  return (
    <div className="rc-container">
      <h1 className="rc-title">
        {muscleText} routine created successfully!
      </h1>

      <div className="rc-buttons">
        <button
          className="rc-btn"
          onClick={onViewRoutine}
        >
          View Routine
        </button>

        <button
          className="rc-btn"
          onClick={onStartRoutine}
        >
          Start Routine
        </button>

        <button
          className="rc-btn"
          onClick={onCreateNewRoutine}
        >
          Create New Routine
        </button>

        <button
          className="rc-btn"
          onClick={onViewOtherRoutines}
        >
          View Other Routines
        </button>
      </div>
    </div>
  );
}

export default RoutineCreated;
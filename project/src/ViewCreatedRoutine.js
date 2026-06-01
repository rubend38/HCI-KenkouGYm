// import PushDayEasy from './PushDayEasy';
import ViewRoutine from './ViewRoutine';

function ViewCreatedRoutine({
  routine,
  onBack,
  onSelectExercise,
  onEndSession,
  completedExercises,
}) {
  const exercises = [];

  Object.entries(routine.exercises).forEach(
    ([muscle, muscleExercises]) => {
      muscleExercises.forEach((exercise) => {
        exercises.push({
          name: exercise,
          recommended: `${muscle} Exercise`,
        });
      });
    }
  );

  return (
    <ViewRoutine
      onBack={onBack}
      onAddExercise={() => {}}
      onSelectExercise={onSelectExercise}
      onEndSession={onEndSession}
      completedExercises={completedExercises}
      exercises={exercises}
      routineName="Custom Routine"
    />
  );
}

export default ViewCreatedRoutine;
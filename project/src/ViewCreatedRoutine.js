// import PushDayEasy from './PushDayEasy';
import ViewRoutine from './ViewRoutine';

function ViewCreatedRoutine({
  routine,
  onBack,
  onDeleteExercises,
  onStartWorkout,
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
      onDeleteExercises={onDeleteExercises}
      completedExercises={completedExercises}
      exercises={exercises}
      onStartWorkout={onStartWorkout}
      routineName="Custom Routine"
    />
  );
}

export default ViewCreatedRoutine;
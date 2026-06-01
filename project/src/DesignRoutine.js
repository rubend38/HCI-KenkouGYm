import { useState } from 'react';
import './DesignRoutine.css';

const MUSCLES = [
  'Biceps',
  'Triceps',
  'Shoulders',
  'Back',
  'Chest',
  'Quads',
  'Hamstrings',
  'Glutes',
  'Abs',
  'Cardio',
];

const EXERCISES = {
  Chest: [
    'Chest Flies',
    'Chest Press Machine',
    'Wide Grip Push Ups',
    'Incline Chest Press',
    'Decline Chest Press',
    'Cable Crossover',
  ],

  Biceps: [
    'Barbell Curl',
    'Hammer Curl',
    'Concentration Curl',
    'Cable Curl',
    'Preacher Curl',
  ],

  Triceps: [
    'Tricep Pushdown',
    'Overhead Extension',
    'Bench Dips',
    'Skull Crushers',
    'Close Grip Bench',
  ],

  Shoulders: [
    'Shoulder Press',
    'Lateral Raise',
    'Front Raise',
    'Rear Delt Fly',
    'Arnold Press',
  ],

  Back: [
    'Lat Pulldown',
    'Seated Row',
    'Pull Ups',
    'T-Bar Row',
    'Face Pulls',
  ],

  Quads: [
    'Leg Press',
    'Squat',
    'Bulgarian Split Squat',
    'Leg Extension',
    'Hack Squat',
  ],

  Hamstrings: [
    'Romanian Deadlift',
    'Leg Curl',
    'Good Morning',
    'Glute Ham Raise',
  ],

  Glutes: [
    'Hip Thrust',
    'Cable Kickback',
    'Glute Bridge',
    'Step Ups',
  ],

  Abs: [
    'Crunches',
    'Leg Raises',
    'Plank',
    'Russian Twist',
  ],

  Cardio: [
    'Treadmill',
    'Bike',
    'Row Machine',
    'Jump Rope',
  ],
};

function DesignRoutine({ onBack, onRoutineCreated,}) {
  const [step, setStep] = useState(1);

  const [selectedMuscles, setSelectedMuscles] = useState([]);

  const [currentMuscleIndex, setCurrentMuscleIndex] = useState(0);

  const [routineExercises, setRoutineExercises] = useState({});

  const toggleMuscle = (muscle) => {
    if (selectedMuscles.includes(muscle)) {
      setSelectedMuscles(
        selectedMuscles.filter((m) => m !== muscle)
      );
    } else {
      setSelectedMuscles([...selectedMuscles, muscle]);
    }
  };

  const currentMuscle =
    selectedMuscles[currentMuscleIndex];

  const toggleExercise = (exercise) => {
    const current =
      routineExercises[currentMuscle] || [];

    if (current.includes(exercise)) {
      setRoutineExercises({
        ...routineExercises,
        [currentMuscle]: current.filter(
          (e) => e !== exercise
        ),
      });
      return;
    }

    if (current.length >= 4) {
      alert('Maximum 4 exercises per muscle');
      return;
    }

    setRoutineExercises({
      ...routineExercises,
      [currentMuscle]: [...current, exercise],
    });
  };

  const nextMuscle = () => {
    if (
      currentMuscleIndex <
      selectedMuscles.length - 1
    ) {
      setCurrentMuscleIndex(currentMuscleIndex + 1);
    } else {
        onRoutineCreated(
            selectedMuscles,
            routineExercises
        );
    }
  };

  return (
    <div className="dr-container">
        <button className="dr-back-btn" onClick={onBack}>BACK</button>

      {step === 1 && (
        <>
          <h1 className="dr-title">
            Select muscles you want to add
            to new routine (up to 4)
          </h1>

          <div className="dr-muscle-grid">
            {MUSCLES.map((muscle) => (
              <button
                key={muscle}
                className={`dr-muscle-btn ${
                  selectedMuscles.includes(muscle)
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  toggleMuscle(muscle)
                }
              >
                {muscle}
              </button>
            ))}
          </div>

          <button
            className="dr-select-btn"
            onClick={() => {
              if (
                selectedMuscles.length === 0
              ) {
                alert(
                  'Select at least one muscle'
                );
                return;
              }

              setStep(2);
            }}
          >
            Select
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="dr-title">
            Select exercises to add to
            new routine (up to 4)
          </h1>

          <h2>{currentMuscle}</h2>

          <div className="dr-exercise-list">
            {EXERCISES[currentMuscle]?.map(
              (exercise) => {
                const selected =
                  (
                    routineExercises[
                      currentMuscle
                    ] || []
                  ).includes(exercise);

                return (
                  <button
                    key={exercise}
                    className={`dr-exercise-btn ${
                      selected
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() =>
                      toggleExercise(
                        exercise
                      )
                    }
                  >
                    {exercise}
                  </button>
                );
              }
            )}
          </div>

          <div className="dr-next-row">
            <button
                className="dr-next-btn"
                onClick={nextMuscle}
            >
                {currentMuscleIndex === selectedMuscles.length - 1
                ? 'Finish'
                : 'Next Muscle'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DesignRoutine;
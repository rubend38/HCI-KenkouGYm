import './SelectRoutine.css';

function SelectRoutine({ onBack, onNavigate }) {
  const routines = [
    {
      category: 'Pull Day (Back and Biceps)',
      options: [
        { label: 'Easy (30 mins)', route: '/PullDayEasy' },
        { label: 'Moderate (50 mins)', route: '/PullDayModerate' },
      ],
    },
    {
      category: 'Push Day (Chest and Triceps)',
      options: [
        { label: 'Easy (30 mins)', route: '/PushDayEasy' },
        { label: 'Moderate (50 mins)', route: '/PushDayModerate' },
      ],
    },
  ];

  return (
    <div className="sr-container">
      <button className="sr-back-btn" onClick={onBack}>BACK</button>

      <h1 className="sr-title">Select Today's Routine</h1>

      {routines.map((routine) => (
        <section key={routine.category} className="sr-section">
          <h2 className="sr-category">{routine.category}</h2>
          <div className="sr-cards">
            {routine.options.map((opt) => (
              <div key={opt.label} className="sr-card-wrapper">
                <div className="sr-card">
                  <p className="sr-card-title">{opt.label}</p>
                  <p className="sr-card-placeholder">{'{Images and Examples}'}</p>
                </div>
                <button
                  className="sr-select-btn"
                  onClick={() => opt.route && onNavigate(opt.route)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default SelectRoutine;

import './bottomNav.css';

function BottomNav({ navigate }) {
  return (
    <div className="bottom-nav">
      <button onClick={() => navigate('/')}>
        <img src="/homelogo.png" alt="Home" className="nav-home" />
        {/* Home */}
      </button>

      <button onClick={() => navigate('/')}>
        <img src="/community.png" alt="Home" className="nav-community" />
        {/* Workout */}
      </button>

      <button onClick={() => navigate('/')}>
        <img src="/profile.png" alt="Log" className="nav-profile" />
        {/* Log */}
      </button>

      <button onClick={() => navigate('/')}>
        <img src="/settingslogo.png" alt="Browse" className="nav-settings" />
        {/* Browse */}
      </button>
    </div>
  );
}

export default BottomNav;
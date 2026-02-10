import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext); // Use logoutUser from context
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="welcome-screen">
      <nav className="top-nav">
        {user ? (
          <div className="profile-wrapper" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            {/* Circle icon with first letter */}
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={logoutUser} className="logout-link">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-nav-btn" onClick={() => navigate('/login')}>Login →</button>
        )}
      </nav>

      <div className="hero-content">
        <img src="/bot.jpg" alt="bot" className="robot-img" />
        {/* Dynamic greeting */}
        <h1>Hey {user ? user.name : 'Guest'} 👋</h1>
        <p className="welcome-text">Welcome to our web app</p>
        <p className="description"> 
            Let's start with a quick product tour and we will have you up and running in no time!
        </p>
        <button className="get-started-btn" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
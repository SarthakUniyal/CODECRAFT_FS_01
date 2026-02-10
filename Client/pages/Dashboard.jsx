import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    // We pull 'user' from context. If 'user.name' exists, it shows that.
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    return (
        <div className="dashboard-wrapper">
            <div className="glass-card">
                <div className="user-icon">👤</div>
                {/* Dynamic name replacement happens here */}
                <h1>Hey {user?.name || 'Developer'}! 👋</h1>
                <p className="subtitle">Welcome to our app</p>
                <p className="description">You have successfully authenticated and accessed your private dashboard.</p>
                
                <button onClick={handleLogout} className="btn-logout">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
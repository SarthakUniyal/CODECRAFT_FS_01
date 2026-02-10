import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData);
            loginUser(data);
            navigate('/dashboard');
        } catch (err) {
            alert("Login Failed: " + err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
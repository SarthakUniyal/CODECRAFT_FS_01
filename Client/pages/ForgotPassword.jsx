import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestOTP, resetPassword } from '../services/authService';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP & New Pass
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            await requestOTP(email);
            setStep(2);
            // alert("OTP sent to your Gmail!");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to send OTP");
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            await resetPassword({ email, otp, newPassword });
            // alert("Password updated successfully!");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{step === 1 ? "Reset Password" : "Enter OTP"}</h2>
                <p className="auth-subtitle">
                    {step === 1 ? "We will send an OTP to your email" : "Enter the code sent to your Gmail"}
                </p>

                <form onSubmit={step === 1 ? handleSendOTP : handleReset}>
                    {step === 1 ? (
                        <div className="input-field">
                            <span className="icon"><img src="/email.png" alt="" /></span>
                            <input 
                                type="email" 
                                placeholder="EMAIL ADDRESS" 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                    ) : (
                        <>
                            <div className="input-field">
                                <span className="icon"><img src="/password.png" alt="" /></span>
                                <input 
                                    type="text" 
                                    placeholder="6-DIGIT OTP" 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="input-field">
                                <span className="icon"><img src="/password.png" alt="" /></span>
                                <input 
                                    type="password" 
                                    placeholder="NEW PASSWORD" 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                        </>
                    )}

                    <button type="submit" className="auth-btn-black">
                        {step === 1 ? "SEND OTP" : "SUBMIT"}
                    </button>
                </form>

                <p className="auth-toggle" onClick={() => navigate('/login')}>
                    Back to <span>LOGIN</span>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
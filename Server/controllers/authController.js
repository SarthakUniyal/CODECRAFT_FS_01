import transporter from '../config/nodemailer.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Logic for User Registration
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Use NEW and SAVE for more explicit control
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save(); // This line MUST complete before moving on

        if (savedUser) {
            console.log("✅ Data successfully pushed to Atlas:", savedUser.email);
            res.status(201).json({
                _id: savedUser._id,
                name: savedUser.name,
                token: generateToken(savedUser._id)
            });
        }
    } catch (error) {
        console.error("❌ MongoDB Write Error:", error);
        res.status(500).json({ message: "Database write failed: " + error.message });
    }
};

// Logic for User Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        // Compare entered password with the hashed password in DB
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error during login" });
    }
};

// Generate JWT (Json Web Token)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Add these to your controller
let otpStore = {}; 

export const sendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = otp;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Password Reset OTP',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center;">
                    <h2>Password Reset Request</h2>
                    <p>Your OTP code is:</p>
                    <h1 style="color: #000; letter-spacing: 5px;">${otp}</h1>
                    <p>This code will expire in 10 minutes.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent to your Gmail inbox!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send email" });
    }
};

// Logic to Verify OTP and Reset Password
export const verifyOTP = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        // Check if OTP matches the one stored in memory
        if (otpStore[email] === otp) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            
            await User.findOneAndUpdate({ email }, { password: hashedPassword });
            delete otpStore[email]; // Clear OTP after successful use
            res.json({ message: "Password reset successful!" });
        } else {
            res.status(400).json({ message: "Invalid or expired OTP" });
        }
    } catch (error) {
        res.status(500).json({ message: "Reset failed: " + error.message });
    }
};
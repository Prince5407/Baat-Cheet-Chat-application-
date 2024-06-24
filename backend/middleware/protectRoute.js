import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import cookieParser from 'cookie-parser'; // Ensure cookie-parser is included

const protectRoute = async (req, res, next) => {
    try {
        // Extract the JWT token from cookies
        const token = req.cookies.jwt;
        
        // Check if the token is present
        if (!token) {
            return res.status(401).json({ error: "Not authorized, no token is present" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user by ID, excluding the password field
        const user = await User.findById(decoded.userId).select('-password');

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: "Not authorized, user not found" });
        }

        // Attach user to the request object
        req.user = user;
        
        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors such as invalid token
        return res.status(401).json({ error: "Not authorized, token invalid" });
    }
};

export default protectRoute;

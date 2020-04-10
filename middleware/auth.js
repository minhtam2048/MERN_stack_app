import { verify } from 'jsonwebtoken';
import { get } from 'config';

export default function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, Authorization denied' });
    }

    // Verify token
    try {
        const decoded = verify(token, get('jwtSecret'));
        
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async (req, res, next)=> {
    let token;
    console.log('--- Middleware Protect Dipanggil ---');
    console.log('Header Authorization:', req.headers.authorization);

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Save Token to Token
            token = req.headers.authorization.split(' ')[1];
            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Take the user data from token wihtout password saved it to req.user
            req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            console.log(error)
            res.status(401);
        }
    }
    next();
});

export const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not Authorized as an Admin');
    }
};

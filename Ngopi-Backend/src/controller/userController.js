import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// POST LOGIN
const authUser = asyncHandler(async(req, res)=> {
    const {email, password} = req.body // the Request
    const user = await User.findOne({email}) // user = Find email/email
    
    // if user true/exist from email then match the password
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Your Email or Password is Incorrect');
    }
});

// POST REGISTER
const registerUser = asyncHandler(async (req, res)=> {
    const {name, email, password} = req.body // the request
    const userExist = await User.findOne({email}); // user exist if user got email same as in db

    if(userExist) { // if userExist true then throw this Error
        res.status(400);
        throw new Error('this email is already registered');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Data is Not Valid')
    }
});

export {authUser, registerUser};
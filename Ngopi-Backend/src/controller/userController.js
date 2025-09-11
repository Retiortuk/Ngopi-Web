import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import e from 'express';

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

// GET USER PROFILE
const getUserProfiles = asyncHandler(async(req, res)=> {
    const user = await User.findById(req.user._id);

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User Tidak DItemukan');
    }
});

// UPDATE USER PROFILE
const updateProfile = asyncHandler(async(req, res)=> {
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }
        
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        });
    } else {
        res.status(404);
        throw new Error('User Tidak Ditemukan')
    }
});

// GET ALL USERS
const getUsers = asyncHandler(async(req, res)=> {
    const users = await User.find({});
    res.json(users);
})

// DELETE USER
const deleteUser = asyncHandler(async(req, res)=> {
    const user = await User.findById(req.params.id);
    if(user){
        await user.deleteOne();
        res.json({message: 'User berhasil dihapus'});
    } else {
        res.status(404);
        throw new Error('User tidak ditemukan')
    }
})

export {authUser, registerUser, getUserProfiles, updateProfile, getUsers, deleteUser};
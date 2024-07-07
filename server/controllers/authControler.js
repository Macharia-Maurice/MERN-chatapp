const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const createError = require('../utils/appError');

const secret= process.env.JWT_SECRET


// register user
exports.register = async (req, res, next)=>{

    const { first_name, last_name, email, password, confirm_password}=req.body;
    
    if(password !== confirm_password) return next(new createError('Passwords do not match', 400));


    try{

        let user = await User.findOne({ email });
        if (user) return next( new createError('User already exists', 400))

        const hashedPassword = await bcrypt.hash(password, 8);

        user = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });
        await user.save();

        // assign jwt to user
        const token = jwt.sign({ id: user.id }, secret , { expiresIn: '1d'});
 
        res
        .status(201)
        .json({
            status: 'success',
            message: 'user registered successfully',
            token,
            user,
        });
        

    }catch{
        next( new createError('Server error', 500))
    }
};


// login user
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        // Check if email and password are provided
        if (!email || !password) {
            return next(new createError('Email and password are required', 400));
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new createError('Invalid credentials', 400));
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new createError('Invalid credentials', 400));
        }

        // Assign JWT token to user
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });

        res
            .status(201)
            .json({
                status: 'success',
                message: 'User logged in successfully',
                token,
            });

    } catch (err) {
        console.error('Login Error:', err); // Log the error details
        next(new createError('Server error', 500));
    }
};
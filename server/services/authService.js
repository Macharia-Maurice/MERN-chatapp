const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// Function to generate access token
exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, accessTokenSecret, { expiresIn: '1h' });
};

// Function to generate refresh token
exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, refreshTokenSecret, { expiresIn: '1d' });
};

// Function to verify refresh token
exports.verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
};

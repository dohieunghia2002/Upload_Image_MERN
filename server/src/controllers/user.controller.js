
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let refreshTokens = [];

// [POST] /user/auth/register
const register = async (req, res) => {
    const { username, password, fullName } = req.body;
    try {
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({ message: 'username already exists' });
        }

        const saltRounds = 10;
        const pwdHashed = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ fullName, username, password: pwdHashed });

        return res.status(201).json({ ...user._doc });
    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

const generateAccessToken = async (user) => {
    return jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '2h' }
    );
}

const generateRefreshToken = async (user) => {
    return jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '30d' }
    );
}

// [POST] /user/auth/refresh
const requestRefreshToken = async (req, res) => {
    try {
        const refreshToken = await req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json('You are not authenticated');
        }

        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid');
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            const newAccessToken = await generateAccessToken(user);
            const newRefreshToken = await generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            await res.cookie('refreshToken', newRefreshToken, {
                sameSite: "none",
                secure: true
            });
            return res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (err) {
        console.log(err);
    }
}

// [POST] /user/auth/login
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'not found' });
        }

        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
            return res.status(401).json({ message: 'wrong password' });
        }

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        refreshTokens.push(refreshToken);

        await res.cookie('refreshToken', refreshToken, {
            sameSite: "none",
            secure: true
        });

        user.password = undefined;
        return res.status(200).json({ ...user._doc, accessToken, refreshToken });
    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

// [POST] /user/logout
const userLogout = async (req, res) => {
    try {
        const refreshToken = await req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json('You are not authenticated');
        }
        else {
            await res.clearCookie('refreshToken');
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            return res.status(200).json({ message: 'Logged out' });
        }
    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

// [GET] /test/cookie
const test = async (req, res) => {
    try {
        const temp = await req.cookies.refreshToken;
        console.log(temp);
        return res.status(200).json(temp);
    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

export default { register, login, requestRefreshToken, userLogout, test };
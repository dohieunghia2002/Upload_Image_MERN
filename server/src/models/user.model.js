import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 8, maxlength: 16, unique: true },
    password: { type: String, required: true, minlength: 8 },
    fullName: { type: String, required: true },
    avatar: { type: String, default: 'https://www.pngmart.com/files/22/User-Avatar-Profile-Download-PNG-Isolated-Image.png' },
    isAdmin: { type: Boolean, default: false }
}, { collection: 'user' });

const User = mongoose.model('User', userSchema);
export default User;

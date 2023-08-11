import Image from "../models/image.model.js";
import User from '../models/user.model.js';

// [GET] /image/
const imagesAll = async (req, res) => {
    try {
        const images = await Image.findOne({ userID: req.user.id });
        return res.status(200).json(images);
    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

// [POST] /image/upload
const uploadImg = async (req, res) => {
    const { userID, photo } = req.body;
    try {
        const userExist = await Image.findOne({ userID: userID });
        if (!userExist) {
            const image = await Image.create({
                userID, photo
            });
            return res.status(200).json(image);
        }
        else {
            userExist.photo.push(...photo);
            console.log(userExist.photo);
            await userExist.save();
            return res.status(200).json({ message: 'Add success' });
        }
    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

const changeAvatar = async (req, res) => {
    const { userID, avatar } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userID, { avatar: avatar }, { new: true });
        res.status(200).json(user);
    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

export default { uploadImg, imagesAll, changeAvatar };
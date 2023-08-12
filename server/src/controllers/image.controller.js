import Image from "../models/image.model.js";
import User from '../models/user.model.js';
import { v2 as cloudinary } from 'cloudinary';

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
            await userExist.save();
            return res.status(200).json({ message: 'Add success' });
        }
    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

// [PATCH] /image/avatar/change
const changeAvatar = async (req, res) => {
    const { userID, avatar } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userID, { avatar: avatar }, { new: true });
        res.status(200).json(user);
    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

//[DELETE] /image/:id
const deleteImage = async (req, res) => {
    try {
        const image = await Image.findOne({ userID: req.user.id });

        let index = 0;
        for (let i = 0; i < image.photo.length; i++) {
            let item = image.photo[i];
            if (item._id == req.params.id) {
                index = i;
                break;
            }
        }
        const deleted = image.photo.splice(index, 1);

        let imgId = deleted[0].cloudID;
        const temp = await cloudinary.uploader.destroy(imgId);

        await image.save();
        return res.status(200).json(temp);

    } catch {
        return res.status(500).json({ message: 'Oops! Something wrong' });
    }
}

export default { uploadImg, imagesAll, changeAvatar, deleteImage };
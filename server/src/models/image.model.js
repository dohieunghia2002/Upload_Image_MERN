import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    photo: [
        {
            title: { type: String },
            link: { type: String, required: true }
        }
    ]
}, { collection: 'image' });

const Image = mongoose.model('Image', imageSchema);
export default Image;

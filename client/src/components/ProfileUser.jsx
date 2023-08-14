import { useDispatch, useSelector } from 'react-redux';
import '../assets/styles/profileUser.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateAvatar } from '../redux/apiRequest';
import { createAxios } from '../createInstance.js';
import { updateAvatarSuccess } from '../redux/userSlice.js';
import axios from 'axios';


const ProfileUser = () => {
    const user = useSelector((state) => state.user.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, updateAvatarSuccess);

    const changeAvatar = async () => {
        const file = document.getElementById('avatar-edit__input').files[0];
        const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
        const PRESET_NAME = process.env.REACT_APP_PRESET_NAME;
        const FOLDER_NAME = process.env.REACT_APP_FOLDER_NAME;
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formChangeAvatar = new FormData();

        formChangeAvatar.append('upload_preset', PRESET_NAME);
        formChangeAvatar.append('folder', FOLDER_NAME);
        formChangeAvatar.append('file', file);

        const res = await axios.post(api, formChangeAvatar, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const formUpdate = {
            userID: user?._id,
            avatar: res.data.secure_url
        }
        await updateAvatar(formUpdate, dispatch, axiosJWT);
    }

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="profile">
            <img src={user?.avatar} alt="avatar" className="profile__avatar" />
            <label type='file' className="avatar-edit__label" htmlFor="avatar-edit__input">
                <i className="fas fa-pen"></i>
            </label>
            <input type="file" id="avatar-edit__input" hidden onChange={changeAvatar} />
            <h3 className="profile__name">{user?.fullName}</h3>
            <p className="profile__slogan">Hello World!.</p>
        </div>
    );
}

export default ProfileUser;
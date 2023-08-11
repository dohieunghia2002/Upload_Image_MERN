import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ProfileUser from "../../components/ProfileUser";
import Post from "../../components/Post";
import { logoutUser, uploadImages } from '../../redux/apiRequest';
import { logoutSuccess } from '../../redux/userSlice';
import { uploadSuccess } from '../../redux/imageSlice';
import { createAxios } from '../../../src/createInstance.js';
import './home.css';

const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

const Home = () => {
    const [error, setError] = useState(false);
    const user = useSelector((state) => state.user.login.currentUser);
    const imgs = useSelector((state) => state.image.images.allImages);
    const accessToken = user?.accessToken;
    const id = user?._id;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const handleSubmitImg = async () => {
        const uploadImgInput = document.getElementById('upload__input');
        uploadImgInput.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        const files = uploadImgInput.files;
        const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
        const PRESET_NAME = process.env.REACT_APP_PRESET_NAME;
        const FOLDER_NAME = process.env.REACT_APP_FOLDER_NAME;
        var links = [];
        const form = new FormData();

        form.append('upload_preset', PRESET_NAME);
        form.append('folder', FOLDER_NAME);

        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        for (const file of files) {
            if (validFileTypes.includes(file.type)) {
                setError(false);
                form.append('file', file);

                var res = await axios.post(api, form, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                var result = {
                    title: file.name,
                    link: res.data.secure_url
                }
                links.push(result);
            }
            else {
                setError(true);
            }
        }

        const images = {
            userID: id,
            photo: links
        }

        const axiosJWT = createAxios(user, dispatch, uploadSuccess);
        await uploadImages(accessToken, images, dispatch, axiosJWT);
    }

    const handleLogout = () => {
        logoutUser(dispatch, navigate, id, accessToken, axiosJWT);
    }

    return (
        <div className="page__container">
            <div className="logout__wrapper">
                <button type="button" className="logout__btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="user__bg">
                <ProfileUser />

                <div className="upload">
                    <input type="file" className="upload__input" id="upload__input" hidden multiple onChange={handleSubmitImg} />
                    <label className="upload__label" htmlFor="upload__input">
                        Upload
                    </label>
                    {error && <p>Error: File must be in JPG/PNG format</p>}
                </div>
            </div>

            <Post />
        </div>
    );
}

export default Home;
import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed, logoutStart, logoutFailed, logoutSuccess, updateAvatarFailed, updateAvatarStart, updateAvatarSuccess } from "./userSlice";
import { destroyFailed, destroySuccess, getImgFailed, getImgStart, getImgSuccess, uploadFailed, uploadStart, uploadSuccess } from "./imageSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const headerConfig = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        const res = await axios.post(
            `${process.env.REACT_APP_SERVER_LINK}/user/auth/login`, user,
            {
                withCredentials: true,
                headers: headerConfig
            },
        );
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch {
        dispatch(loginFailed());
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/user/auth/register`, user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch {
        dispatch(registerFailed());
    }
}

export const logoutUser = async (dispatch, navigate, id, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        const headerConfig = {
            authorization: `Bearer ${accessToken}`
        }
        await axiosJWT.post(
            `${process.env.REACT_APP_SERVER_LINK}/user/logout`, id,
            {
                withCredentials: true,
                headers: headerConfig
            }
        );
        sessionStorage.clear();
        await dispatch(logoutSuccess());
        await navigate('/login');
    } catch {
        dispatch(logoutFailed());
    }
}

export const allImages = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getImgStart());
    try {
        const headerConfig = {
            'authorization': `Bearer ${accessToken}`
        }
        const res = await axiosJWT.get(`${process.env.REACT_APP_SERVER_LINK}/image/`, { headers: headerConfig });
        dispatch(getImgSuccess(res.data));
    } catch {
        dispatch(getImgFailed());
    }
}

export const uploadImages = async (accessToken, form, dispatch, axiosJWT) => {
    dispatch(uploadStart());
    try {
        const headerConfig = {
            authorization: `Bearer ${accessToken}`
        }
        const res = await axiosJWT.post(`${process.env.REACT_APP_SERVER_LINK}/image/upload`, form, { headers: headerConfig });
        await dispatch(uploadSuccess());
        window.location.reload();
    } catch {
        dispatch(uploadFailed());
    }
}

export const removeImage = async (accessToken, id, dispatch, axiosJWT) => {
    dispatch(destroySuccess());
    try {
        const headerConfig = {
            authorization: `Bearer ${accessToken}`
        }
        const res = await axiosJWT.delete(`${process.env.REACT_APP_SERVER_LINK}/image/${id}`, { headers: headerConfig });
        await dispatch(destroySuccess(res.data));
        window.location.reload();
    } catch {
        dispatch(destroyFailed());
    }
}

export const updateAvatar = async (form, dispatch, axiosJWT) => {
    dispatch(updateAvatarStart());
    try {
        const res = await axiosJWT.patch(`${process.env.REACT_APP_SERVER_LINK}/image/avatar/change`, form);
        await dispatch(updateAvatarSuccess(res.data));
    } catch {
        dispatch(updateAvatarFailed());
    }
}
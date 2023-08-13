import axios from "axios";
import jwtDecode from "jwt-decode";

const refreshToken = async (id) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_SERVER_LINK}/user/auth/refresh`, id,
            {
                withCredentials: true
            },
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();

    newInstance.interceptors.request.use(async (config) => {
        let date = new Date();
        const decodedToken = jwtDecode(user?.accessToken);
        if (decodedToken.exp < (date.getTime() / 1000)) {
            const data = await refreshToken(user?._id);
            const refreshUser = {
                ...user,
                accessToken: data.accessToken
            }
            dispatch(stateSuccess(refreshUser));
            config.headers['authorization'] = 'Bearer ' + data.accessToken;
        }
        return config;
    },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
}
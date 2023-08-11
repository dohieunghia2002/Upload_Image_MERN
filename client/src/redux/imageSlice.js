import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'image',
    initialState: {
        images: {
            allImages: null,
            isFeatching: false,
            error: false
        },
        upload: {
            isFeatching: false,
            success: false,
            error: false
        }
    },
    reducers: {
        getImgStart: (state) => {
            state.images.isFeatching = true;
        },
        getImgSuccess: (state, actions) => {
            state.images.isFeatching = false;
            state.images.allImages = actions.payload;
        },
        getImgFailed: (state) => {
            state.images.isFeatching = false;
            state.images.error = true;
        },

        uploadStart: (state) => {
            state.upload.isFeatching = true;
        },
        uploadSuccess: (state) => {
            state.upload.isFeatching = false;
            state.upload.success = true;
            state.upload.error = false;
        },
        uploadFailed: (state) => {
            state.upload.isFeatching = false;
            state.upload.success = false;
            state.upload.error = true;
        },


    }
});

export const {
    getImgStart,
    getImgSuccess,
    getImgFailed,
    uploadStart,
    uploadSuccess,
    uploadFailed
} = imageSlice.actions;

export default imageSlice.reducer;
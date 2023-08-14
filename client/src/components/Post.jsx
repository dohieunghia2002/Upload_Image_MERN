import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/styles/post.css';
import { createAxios } from '../../src/createInstance.js';
import { loginSuccess } from '../redux/userSlice';
import { allImages, removeImage } from '../redux/apiRequest';
import { destroySuccess, getImgSuccess } from '../redux/imageSlice';

const QUANTITY_PHOTO_PAGE = 5;

const Post = () => {
    const user = useSelector((state) => state.user.login.currentUser);
    const imgs = useSelector((state) => state.image.images.allImages);
    const [openDropMenu, setOpenDropMenu] = useState('');
    const [idImg, setIdImg] = useState('');
    const [curIdxPage, setCurIdxPage] = useState(0);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const photoList = imgs?.photo;
    const accessToken = user?.accessToken;

    const QUANTITY_BTN_PAGINATION = Math.ceil(photoList?.length / QUANTITY_PHOTO_PAGE);
    const IDX_FIRST_PHOTO_PAGE = curIdxPage * QUANTITY_PHOTO_PAGE;
    const IDX_LAST_PHOTO_PAGE = curIdxPage * QUANTITY_PHOTO_PAGE + (QUANTITY_PHOTO_PAGE - 1);

    const HandleSetPagination = () => {
        const temp = [];
        for (let index = 0; index < QUANTITY_BTN_PAGINATION; index++) {
            if (curIdxPage == index) {
                const element = (
                    <button type="button" key={index} className="pagination__btn active" onClick={() => setCurIdxPage(index)}>
                        {index + 1}
                    </button>
                )
                temp.push(element)
            }
            else {
                const element = (
                    <button type="button" key={index} className="pagination__btn" onClick={() => setCurIdxPage(index)}>
                        {index + 1}
                    </button>
                )
                temp.push(element)
            }
        }
        return temp;
    }

    const idxPrevPage = () => {
        if (curIdxPage > 0) {
            setCurIdxPage(curIdxPage - 1);
        }
    }
    const idxNextPage = () => {
        if (curIdxPage < (QUANTITY_BTN_PAGINATION - 1)) {
            setCurIdxPage(curIdxPage + 1);
        }
    }

    const toggleDropdownMenu = () => {
        let dropdowns = document.getElementsByClassName('dropdown__content');
        for (let i = 0; i < dropdowns.length; i++) {
            const element = dropdowns[i];
            if (element?.classList.contains('show')) {
                element?.classList.remove('show');
            }
        }

        let dropdownContent = document.getElementById(openDropMenu);
        dropdownContent?.classList.toggle('show');
    }

    const deleteImage = async () => {
        const axiosJWT = createAxios(user, dispatch, destroySuccess);
        await removeImage(accessToken, idImg, dispatch, axiosJWT);
    }

    useEffect(() => {
        const axiosJWT = createAxios(user, dispatch, getImgSuccess)
        allImages(accessToken, dispatch, axiosJWT);
    }, [curIdxPage]);

    useEffect(() => {
        const axiosJWT = createAxios(user, dispatch, getImgSuccess)
        allImages(accessToken, dispatch, axiosJWT);
    }, []);

    useEffect(() => {
        deleteImage();
    }, [idImg]);

    useEffect(() => {
        toggleDropdownMenu();
    }, [openDropMenu]);


    return (
        <>
            {photoList?.length > 0 && (
                <div className="pagination">
                    <button type="button" className="pagination__btn--prev" onClick={idxPrevPage}>&laquo;</button>
                    <HandleSetPagination />
                    <button type="button" className="pagination__btn--next" onClick={idxNextPage}>&raquo;</button>
                </div>
            )}

            <div className="container">
                {photoList?.slice(IDX_FIRST_PHOTO_PAGE, IDX_LAST_PHOTO_PAGE + 1)?.map((item) => (
                    <div key={item._id} className="item">
                        <img src={item.link} className="item__img" alt={item.cloudID} />
                        <button type="button" className="menu__wrapper dropbtn" onClick={() => openDropMenu != item._id ? setOpenDropMenu(item._id) : setOpenDropMenu('')}>
                            <i className="fas fa-ellipsis-v menu__icon"></i>
                        </button>
                        <div id={item._id} className="dropdown__content">
                            <button type="button" className="menu-dropdown__btn" onClick={() => idImg != item._id ? setIdImg(item._id) : setIdImg('')}>Delete</button>
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

export default Post;

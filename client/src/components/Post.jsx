import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/styles/post.css';
import { createAxios } from '../../src/createInstance.js';
import { loginSuccess } from '../redux/userSlice';
import { allImages } from '../redux/apiRequest';

const QUANTITY_PHOTO_PAGE = 5;

const Post = () => {
    const user = useSelector((state) => state.user.login.currentUser);
    const imgs = useSelector((state) => state.image.images.allImages);
    const [openDropMenu, setOpenDropMenu] = useState(0);
    const [curIdxPage, setCurIdxPage] = useState(0);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const photoList = imgs?.photo;
    const accessToken = user?.accessToken;

    const QUANTITY_BTN_PAGINATION = Math.ceil(photoList?.length / QUANTITY_PHOTO_PAGE);
    const IDX_FIRST_PHOTO_PAGE = curIdxPage * QUANTITY_PHOTO_PAGE;
    const IDX_LAST_PHOTO_PAGE = curIdxPage * QUANTITY_PHOTO_PAGE + (QUANTITY_PHOTO_PAGE - 1);

    const HandleSetPagination = () => {
        const temp = []
        for (let index = 0; index < QUANTITY_BTN_PAGINATION; index++) {
            temp.push(
                (
                    <button type="button" key={index} onClick={() => setCurIdxPage(index)}>
                        {index + 1}
                    </button>

                )
            )
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
        let dropdownContent = document.getElementById(openDropMenu);
        dropdownContent?.classList.toggle('show');
        setOpenDropMenu(0);
    }

    useEffect(() => {
        allImages(accessToken, dispatch, axiosJWT);
    }, [curIdxPage]);

    useEffect(() => {
        toggleDropdownMenu();
    }, [openDropMenu])


    return (
        <>
            <div className="pagination">
                <button type="button" onClick={idxPrevPage}>&laquo;</button>
                <HandleSetPagination />
                <button type="button" onClick={idxNextPage}>&raquo;</button>
            </div>

            <div className="container">
                {photoList?.slice(IDX_FIRST_PHOTO_PAGE, IDX_LAST_PHOTO_PAGE + 1)?.map((item) => (

                    <div key={item._id} className="item">
                        <img src={item.link} className="item__img" alt={item.title} title={item.title} />
                        <button type="button" className="menu__wrapper dropbtn" onClick={() => setOpenDropMenu(item._id)}>
                            <i className="fas fa-ellipsis-v menu__icon"></i>
                        </button>
                        <div id={item._id} className="dropdown__content">
                            <button type="button" className="menu-dropdown__btn">Change title</button>
                            <button type="button" className="menu-dropdown__btn">Delete</button>
                        </div>
                    </div>

                ))}
            </div >
        </>
    )
}

export default Post;

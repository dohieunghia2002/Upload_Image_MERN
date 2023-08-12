import { useEffect, useState } from 'react';
import './login.css';
import { loginUser } from '../../redux/apiRequest.js';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const formHeight = {
    minHeight: "300px"
}

const Login = () => {
    const [screenHeight, setScreenHeight] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCenterForm = () => {
        setScreenHeight(window.innerHeight);
        const loginContainer = document.getElementsByClassName('login__container')[0];
        const distanceMargin = Math.ceil((screenHeight - 440) / 2);
        loginContainer.style.marginTop = distanceMargin + 'px';
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password
        }
        loginUser(newUser, dispatch, navigate);
    }

    useEffect(() => {
        handleCenterForm();
    }, [screenHeight]);

    return (
        <section className="login__container" style={{ ...formHeight }} onSubmit={handleSubmitForm}>
            <h1 className="login__title">Log in</h1>
            <form className="login__form">
                <div className="form__group">
                    <label className="form__label" htmlFor="username">Username</label>
                    <input type="text" className="form__input" id="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form__group">
                    <label className="form__label" htmlFor="password">Password</label>
                    <input type="password" className="form__input" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="form-submit__btn">Submit</button>
            </form>

            <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
                Don't have an account?
                <Link to="/register"> Sign Up</Link>
            </p>
        </section >
    );
}

export default Login;
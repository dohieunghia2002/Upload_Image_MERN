import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../Login/login.css';
import { registerUser } from '../../redux/apiRequest';
import { useNavigate, Link } from 'react-router-dom';

const formHeight = {
    minHeight: "300px"
}

const Register = () => {
    const [screenHeight, setScreenHeight] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            username,
            password,
            fullName
        }
        registerUser(newUser, dispatch, navigate);
    }

    const handleCenterForm = () => {
        setScreenHeight(window.innerHeight);
        const registerContainer = document.getElementsByClassName('register__container')[0];
        const distanceMargin = Math.ceil((screenHeight - 300) / 2);
        registerContainer.style.marginTop = distanceMargin + 'px';
    }

    useEffect(() => {
        handleCenterForm();
    }, [screenHeight]);

    return (
        <section className="register__container" style={{ ...formHeight }} onSubmit={handleRegister}>
            <h1 className="register__title">Register</h1>
            <form className="register__form">
                <div className="form__group">
                    <label className="form__label" htmlFor="fullname">Full name</label>
                    <input type="text" className="form__input" id="fullname" placeholder="Enter your fullname" onChange={(e) => setFullName(e.target.value)} />
                </div>
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
                <Link to="/login">Comeback login</Link>
            </p>
        </section>
    );
}

export default Register;
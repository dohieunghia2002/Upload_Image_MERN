import { useState } from 'react';
import './login.css';
import { loginUser } from '../../redux/apiRequest.js';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import LoadingModal from '../../components/Modal/LoadingModal';

const formHeight = {
    maxHeight: "310px"
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password
        }
        setLoading(true);
        loginUser(newUser, dispatch, navigate);
    }

    return (
        <>
            <section className="login__container" style={{ ...formHeight }} onSubmit={handleSubmitForm}>
                <h1 className="login__title">Log in</h1>
                <form className="login__form">
                    <div className="form__group">
                        <label className="form__label" htmlFor="username">Username</label>
                        <input type="text" className="form__input" id="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <span className="auth__note">*username from 8 to 16 characters</span>
                    <div className="form__group">
                        <label className="form__label" htmlFor="password">Password</label>
                        <input type="password" className="form__input" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <span className="auth__note">*password from 8 to 16 characters</span>
                    <button type="submit" className="form-submit__btn">Submit</button>
                </form>

                <p className="auth__link">
                    Don't have an account?
                    <Link to="/register"> Sign Up</Link>
                </p>
            </section >

            <LoadingModal isLoading={isLoading} />
        </>
    );
}

export default Login;
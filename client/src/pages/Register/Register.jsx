import { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../Login/login.css';
import { registerUser } from '../../redux/apiRequest';
import { useNavigate, Link } from 'react-router-dom';
import LoadingModal from '../../components/Modal/LoadingModal';

const formHeight = {
    maxHeight: "310px"
}

const Register = () => {
    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            username,
            password,
            fullName
        }
        setLoading(true);
        await registerUser(newUser, dispatch, navigate);
        setLoading(false);
    }

    return (
        <>
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

                <p className="auth__link">
                    <Link to="/login">Comeback login</Link>
                </p>
            </section>

            <LoadingModal isLoading={isLoading} />
        </>
    );
}

export default Register;
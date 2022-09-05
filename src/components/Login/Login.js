import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';

function Login(props) {
    const [email, setEmail] = React.useState ('');
    const [password, setPassword] = React.useState ('');

    function handleEmailChange(e) {setEmail(e.target.value)};
    function handlePasswordChange(e) {setPassword(e.target.value)};

    function handleAuthorize(e){
        e.preventDefault();
        props.onAuthorise(email, password);
    }

    return (
        <section className="login">
            <div className="entrance-form">
                <img className="entrance-form-logo" src={logo} alt="логотип"/>
                <h1 className="entrance-form__header">Рады видеть!</h1>
                <form className="form" onSubmit={handleAuthorize}>
                    <span className="form__input-title">E-mail</span>
                    <input className="form__input" type="email" required placeholder="Email" onChange={handleEmailChange}/>
                    <span className="form__input-title">Пароль</span>
                    <input className="form__input" type="password" required placeholder="Пароль" onChange={handlePasswordChange}/>
                    <span className="error-span">Что-то пошло не так§..</span>
                    <button className="form__button" type="submit">Войти</button>
                </form>
                <span className="is-registered">
                    Ещё не зарегистрированы?
                    <Link to="/signup" className="is-registered__registration">Регистрация</Link>
                </span>
                    
            </div>
        </section>  
    );    
}

export default Login;

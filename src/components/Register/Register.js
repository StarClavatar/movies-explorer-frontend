import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg'
import React from 'react';

function Register(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleNameChange(e) {setName(e.target.value)};
    function handleEmailChange(e) {setEmail(e.target.value)};
    function handlePasswordChange(e) {setPassword(e.target.value)};

    function handleSubmit(e) {
        e.preventDefault(); // если это отсуствует, то после сабмита, компонент перезагружается и будет не видно запросов в dev-tools
                            // из-за этого убил кучу времени на отладку
        props.onRegister(name, email, password);
    }

    return (
        <section className="register">
            <div className="entrance-form">
                <img className="entrance-form-logo" src={logo} alt="логотип"/>
                <h1 className="entrance-form__header">Добро пожаловать!</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <span className="form__input-title">Имя</span>
                    <input type="text" className="form__input" id='email' name='e-mail' onChange={handleNameChange} value={name} /> 
                        <span className="form__input-title">E-mail</span>
                        <input type="email" className="form__input" id='password' name='password' onChange={handleEmailChange} value={email} />
                        <span className="form__input-title">Пароль</span>
                        <input type="password" className="form__input" onChange={handlePasswordChange} value={password} />
                        <span className="error-span">Что-то пошло не так...</span> 
                    <button className="form__button" type="submit">Зарегистрироваться</button>
                </form>
                <span className="is-registered">
                    Уже зарегистрированы? 
                    <Link to="/signin" className="is-registered__registration">Войти</Link>
                </span>
            </div>
        </section> 
    );    
}

export default Register;

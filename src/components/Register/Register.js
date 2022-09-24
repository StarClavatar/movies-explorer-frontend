import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg'
import React from 'react';
import { useFormWithValidation } from '../../utils/FormHooks';
import { USER_NAME_REGEXP, EMAIL_REGEXP } from '../../constants/constants'

function Register(props) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(); 

    function handleSubmit(e) {
        e.preventDefault(); // если это отсуствует, то после сабмита, компонент перезагружается и будет не видно запросов в dev-tools
                            // из-за этого убил кучу времени на отладку
        props.onRegister(values.user, values.email, values.password);
    }
    // const dis = isValid ? {} : {disabled: 'disabled'};
    return (
        <section className="register">
            <div className="entrance-form">
                <Link to="/">
                    <img className="entrance-form-logo" src={logo} alt="логотип"/>
                </Link>
                <h1 className="entrance-form__header">Добро пожаловать!</h1>
                <form className="form" onSubmit={handleSubmit}>
                    {/* имя пользователя */}
                    <span className="form__input-title">Имя</span>
                    <input 
                        name="user" 
                        type="text" 
                        className={`form__input${errors.user ? ' form__input_invalid' : ''}`} 
                        required 
                        autoFocus
                        autoComplete="off"
                        pattern={USER_NAME_REGEXP}
                        onInput={e => {
                            e.target.setCustomValidity("");
                            if (!e.target.validity.valid) 
                            e.target.setCustomValidity("Только латиница, кирилица, пробел или дефис")}
                        }  
                        onChange={handleChange} 
                        value={values.user ? values.user : ''} 
                    /> 
                    <span className={`error-span${errors.user ? ' error-span_active' : ''}`} >{errors.user}</span> 
                    {/* email */}
                    <span className="form__input-title">E-mail</span>
                    <input 
                        name="email" 
                        type="text" 
                        className={`form__input${errors.email ? ' form__input_invalid' : ''}`}
                        required 
                        pattern={EMAIL_REGEXP}
                        onInput={e => {
                            e.target.setCustomValidity("");
                            if (!e.target.validity.valid) 
                            e.target.setCustomValidity("Введите корректный адрес электронной почты")}
                        }  
                        onChange={handleChange} 
                        value={values.email ? values.email : ''} 
                    />
                    <span className={`error-span${errors.email ? ' error-span_active' : ''}`} >{errors.email}</span> 
                    {/* пароль */}
                    <span className="form__input-title">Пароль</span>
                    <input 
                        name="password" 
                        type="password" 
                        className={`form__input${errors.password ? ' form__input_invalid' : ''}`} 
                        required 
                        autoComplete="off"
                        onChange={handleChange} 
                        value={values.password ? values.password : ''} />
                    <span className={`error-span${errors.email ? ' error-span_active' : ''}`}>{errors.password}</span> 
                    {/* submit */}
                    <button className="form__button" type="submit" {...!isValid ? {disabled: 'disabled'} : {}} >Зарегистрироваться</button>
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

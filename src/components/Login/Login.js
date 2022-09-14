import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../utils/FormHooks';

function Login(props) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    // const [email, setEmail] = React.useState ('');
    // const [password, setPassword] = React.useState ('');

    // function handleEmailChange(e) {setEmail(e.target.value)};
    // function handlePasswordChange(e) {setPassword(e.target.value)};

    function handleAuthorize(e){
        e.preventDefault();
        props.onAuthorise(values.email, values.password);
    }

    return (
        <section className="login">
            <div className="entrance-form">
                <img className="entrance-form-logo" src={logo} alt="логотип"/>
                <h1 className="entrance-form__header">Рады видеть!</h1>
                <form className="form" onSubmit={handleAuthorize}>
                    <span className="form__input-title">E-mail</span>
                    <input className="form__input" 
                        name='email' 
                        placeholder="E-mail" 
                        type="email" 
                        required 
                        onChange={handleChange}
                        value={values.email ? values.email : ''}
                    />
                    <span className={`error-span${errors.email ? ' error-span_active' : ''}`} >
                        {errors.email ? errors.email : ''}
                    </span> 
                    <span className="form__input-title">Пароль</span>
                    <input className="form__input" 
                        name='password' 
                        placeholder="Пароль" 
                        type="password" 
                        required 
                        onChange={handleChange}
                        value={values.password ? values.password : ''}
                    />
                    <span className={`error-span${errors.email ? ' error-span_active' : ''}`} >
                        {errors.password ? errors.password : ''}
                    </span>
                    <button className="form__button" type="submit" {...!isValid ? {disabled: 'disabled'} : {}} >
                        Войти
                    </button>
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

import './Register.css';
import logo from '../../images/logo.svg'

function Register(props) {
    return (
        <section className="register">
            <div className="entrance-form">
                <img className="entrance-form-logo" src={logo} alt="логотип"/>
                <h1 className="entrance-form__header">Добро пожаловать!</h1>
                <form className="form">
                    <span className="form__input-title">Имя</span>
                    <input type="text" className="form__input"/> 
                    <span className="form__input-title">E-mail</span>
                    <input type="password" className="form__input"/>
                    <span className="form__input-title">Пароль</span>
                    <input type="password" className="form__input"/>
                    <span className="error-span">Что-то пошло не так...</span> 
                </form>
                <button className="form__button">Зарегистрироваться</button>
                <span className="is-registered">Уже зарегистрированы? <a className="is-registered__registration" href="#">Войти</a></span>
            </div>
        </section> 
    );    
}

export default Register;

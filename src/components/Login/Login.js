import './Login.css';
import logo from '../../images/logo.svg'

function Login(props) {
    return (
        <section class="login">
            <div class="entrance-form">
                <img class="entrance-form-logo" src={logo} alt="логотип"/>
                <h1 class="entrance-form__header">Рады видеть!</h1>
                <form class="form">
                    <span class="form__input-title">E-mail</span>
                    <input type="text" class="form__input"/>  
                    <span class="form__input-title">Пароль</span>
                    <input type="password" class="form__input"/>
                    <span class="error-span">Что-то пошло не так§..</span>  
                </form>
                <button class="form__button">Войти</button>
                <span class="is-registered">Ещё не зарегистрированы? <a class="is-registered__registration" href="#">Регистрация</a></span>
            </div>
        </section>  
    );    
}

export default Login;

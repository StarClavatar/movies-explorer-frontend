import React from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import menuButton from '../../images/menu__button.svg'
import './Header.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header(props) {
    const currentUser = React.useContext(CurrentUserContext);
    if (currentUser) {
        return (
            <header className="header">
                <div className="link-container">
                    <Link to="/">
                        <img className="header__logo" src={logo} alt="логотип" />
                    </Link>
                    <Link to="/movies" className="link link_films link_visibility">Фильмы</Link>
                    <Link to="/saved-movies" className="link link_saved-films link_visibility">Сохранённые фильмы</Link>
                </div>
                <Link to="/profile" className="link link_account link_visibility">Аккаунт</Link>
                <button className='button menu__button' style={{backgroundImage: `url(${menuButton})`}}></button>
            </header>
        );
    } else {
        return (
            <header className="header">
                <div className="link-container">
                    <img className="header__logo" src={logo} alt="логотип" />
                </div> 
                <Link to="/signup" className="link header__link">Регистрация</Link>
                <Link to="/signin" className="link link_log-in">Войти</Link>
            </header>
        );
    }   
}

export default Header;

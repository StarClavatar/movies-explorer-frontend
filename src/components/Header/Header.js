// import React from 'react';
// import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import menuButton from '../../images/menu__button.svg'
import './Header.css';



function Header(props) {

    return (
        // <header class="header">
        //     <img class="header__logo" src="{logo}" alt="логотип" />
        //     <div class="link-container">
        //         <a href="#" class="link header__link">Регистрация</a>
        //         <a href="#" class="link link_log-in">Войти</a>
        //     </div> 
        // </header>

        <header className="header">
            <div className="link-container">
                <img className="header__logo" src={logo} alt="логотип" />
                <Link to="/movies" className="link link_films link_visibility">Фильмы</Link>
                <Link to="/saved-movies" className="link link_saved-films link_visibility">Сохранённые фильмы</Link>
            </div>
            <Link to="/profile" className="link link_account link_visibility">Аккаунт</Link>
            <button className='button menu__button' style={{backgroundImage: `url(${menuButton})`}}></button>
        </header>
    );    
}

export default Header;

// import React from 'react';
// import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';


function Header(props) {

    return (
        // <header class="header">
        //     <img class="header__logo" src="./images/logo.svg" alt="логотип">
        //     <div class="link-container">
        //         <a href="#" class="link header__link">Регистрация</a>
        //         <a href="#" class="link link_log-in">Войти</a>
        //     </div> 
        // </header>

        <header className="header">
            <div className="link-container">
                <img className="header__logo" src={logo} alt="логотип" />
                {/* <a href="#" className="link link_films">Фильмы</a>
                <a href="#" className="link link_saved-films">Сохранённые фильмы</a> */}
                <Link to="/movies" className="link link_films">Фильмы</Link>
                <Link to="/saved-movies" className="link link_saved-films">Сохранённые фильмы</Link>
            </div>
            {/* <a href="#" className="link link_account">Аккаунт</a> */}
            <Link to="/profile" className="link link_account">Аккаунт</Link> 
        </header>
    );    
}

export default Header;

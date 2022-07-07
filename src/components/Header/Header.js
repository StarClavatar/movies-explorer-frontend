import React from 'react';
// import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Header(props) {

    return (
        // <header className="header">
        //     <img src={Vector} alt="логотип" className="header__logo"/>
        //     <Switch>
        //         <Route exact path={'/'}>
        //             <p className='link header__link'>{props.email}</p>
        //             <Link to='/sign-in' className='link header__link' onClick={}>Выход</Link>
        //         </Route>
        //         <Route path={'/sign-in'}>
        //             <Link to='/sign-up' className='link header__link'>Регистрация</Link>
        //         </Route>
        //         <Route path={'/sign-up'}>
        //             <Link to='/sign-in' className='link header__link'>Вход</Link>
        //         </Route>
        //     </Switch>
        // </header>

        <header class="header">
            <Routes>
                <div class="link-container">
                    <img src={logo} class="header__logo" alt="логотип"/>
                    <Route path={'/Movies'}>
                        {/* <a href="#" class="link link_films">Фильмы</a> */}
                        <Link to='/Movies' className='link link_films'>Фильмы</Link>
                    </Route>
                    <Route path={'/saved-movies'}>
                        {/* <a href="#" class="link link_saved-films">Сохранённые фильмы</a> */}
                        <Link to='/saved-movies' className='link link_saved-films'>Сохранённые фильмы</Link>
                    </Route>
                </div>
                <Route path={'/profile'}>
                    {/* <a href="#" class="link link_account">Аккаунт</a> */}
                    <Link to='/profile' className='link link_account'>Аккаунт</Link>
                </Route>
            </Routes>
        </header>
    );    
}

export default Header;

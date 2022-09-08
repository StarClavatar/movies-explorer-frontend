import './Navigation.css';
import { Link } from 'react-router-dom';
import closeButton from '../../images/close.svg'

function Navigation(props) {
    return (
        <div className='menu'>
            <div className='navigation'>
            <Link to="/" className="link navigation__link">Главная</Link>
            <Link to="/movies" className="link navigation__link">Фильмы</Link>
            <Link to="/saved-movies" className="link navigation__link">Сохранённые фильмы</Link>
            <Link to="/profile" className="link navigation__link link_account">Аккаунт</Link>
            </div>
            <button className='button navigation__close-button' style={{backgroundImage: `url(${closeButton})`}}></button>
        </div>
    );    
}

export default Navigation;
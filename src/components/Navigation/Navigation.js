import './Navigation.css';
import { Link } from 'react-router-dom';
import closeButton from '../../images/close.svg';

function Navigation(props) {
    return (
        <div className={`menu${props.isOpen ? ' menu_opened' : ''}`}>
            <div className='navigation'>
                <Link to="/" className="link navigation__link" onClick={props.onClose}>Главная</Link>
                <Link to="/movies" className="link navigation__link" onClick={props.onClose}>Фильмы</Link>
                <Link to="/saved-movies" className="link navigation__link" onClick={props.onClose}>Сохранённые фильмы</Link>
                <Link to="/profile" className="link navigation__link link_account" onClick={props.onClose}>Аккаунт</Link>
            </div>
            <button className='button navigation__close-button' style={{backgroundImage: `url(${closeButton})`}} onClick={props.onClose}></button>
        </div>
    );    
}

export default Navigation;
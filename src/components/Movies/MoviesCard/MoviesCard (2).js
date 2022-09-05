import './MoviesCard.css';
import favorite from '../../../images/favorite.svg';
import pic__COLOR_pic from '../../../images/pic__COLOR_pic.png';

function MoviesCard({id,name,duration,link}) {
    const hrDuration = `${duration/60}ч ${duration % 60}м` 
    return (
        <li className="movie" key={id}>
            <div className="movie__header">
                <h5 className="movie__heading">{name}</h5>
                <span className="movie__duration">{hrDuration}</span>
                <button className="button movie__favorite-wrapper">
                <img className="movie__favorite" src={favorite} alt="иконка добавить в избранное" />
                </button>
            </div>
            <img className="movie__img" src={pic__COLOR_pic} alt="обложка фильма" />
        </li>
    );    
}

export default MoviesCard;

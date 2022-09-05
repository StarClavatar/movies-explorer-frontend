import './MoviesCard.css';
import favorite from '../../../images/favorite.svg';
import favoriteActive from '../../../images/favorite_active.svg';

function MoviesCard(props) {
    const {name, duration, savedMovieId, imageLink} = props.movie;
    const hrDuration = `${Math.trunc(duration/60)}ч ${duration % 60}м` 
    
    function onFavoriteClick() {
        props.favoriteHandler(props.movie)
    }

    return (
        <li className={`movie${!props.shown ? ' movie_hidden' : ''}`} >
            <div className="movie__header">
                <h5 className="movie__heading">{name}</h5>
                <span className="movie__duration">{hrDuration}</span>
                <button className="button movie__favorite-wrapper">
                <img className="movie__favorite" 
                    src={savedMovieId ? favoriteActive : favorite} alt="иконка добавить в избранное"
                    onClick={onFavoriteClick}
                />
                </button>
            </div>
            <a href={props.trailerLink} target="_blank" rel="noreferrer">
                <img className="movie__img" src={imageLink} alt="обложка фильма" />
            </a>
        </li>
    );    
}

export default MoviesCard;

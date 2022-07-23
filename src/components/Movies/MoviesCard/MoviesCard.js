import './MoviesCard.css';
import favorite from '../../../images/favorite.svg';
import pic__COLOR_pic from '../../../images/pic__COLOR_pic.png';

function MoviesCard(props) {
    return (
        <>
            <div className="movie__header">
                <h5 className="movie__heading">33 слова о дизайне</h5>
                <span className="movie__duration">1ч 47м</span>
                <button className="button movie__favorite-wrapper">
                <img className="movie__favorite" src={favorite} alt="иконка добавить в избранное" />
                </button>
            </div>
            <img className="movie__img" src={pic__COLOR_pic} alt="обложка фильма" />
        </>
    );    
}

export default MoviesCard;

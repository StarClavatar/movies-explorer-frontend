import './MoviesCard.css';
import favorite from '../../../images/favorite.svg';
import pic__COLOR_pic from '../../../images/pic__COLOR_pic.png';

function MoviesCard(props) {
    return (
        <>
            <div class="movie__header">
                <h5 class="movie__heading">33 слова о дизайне</h5>
                <span class="movie__duration">1ч 47м</span>
                <button class="button movie__favorite-wrapper">
                <img class="movie__favorite" src={favorite} alt="иконка добавить в избранное" />
                </button>
            </div>
            <img class="movie__img" src={pic__COLOR_pic} alt="обложка фильма" />
        </>
    );    
}

export default MoviesCard;

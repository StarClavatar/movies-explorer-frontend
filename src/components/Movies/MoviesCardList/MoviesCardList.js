import './MoviesCardList.css';
import movieCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    return (
        <section class="movies">
            <ul class="movies__list">
                <li class="movie">
                    <movieCard />
                </li>
                <li class="movie">
                    <movieCard />
                </li>
                <li class="movie">
                    <movieCard />
                </li>
                <li class="movie">
                    <movieCard />
                </li>
                <li class="movie">
                    <movieCard />
                </li>
                <li class="movie">
                    <movieCard />
                </li>
            </ul>

            <button class="button  movies__more-button">Ещё</button>

        </section>
    );    
}

export default MoviesCardList;

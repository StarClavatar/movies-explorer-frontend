import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    return (
        <section class="movies">
            <ul class="movies__list">
                <li class="movie">
                    <MovieCard />
                </li>
                <li class="movie">
                    <MovieCard />
                </li>
                <li class="movie">
                    <MovieCard />
                </li>
                <li class="movie">
                    <MovieCard />
                </li>
                <li class="movie">
                    <MovieCard />
                </li>
                <li class="movie">
                    <MovieCard />
                </li>
            </ul>

            <button class="button  movies__more-button">Ещё</button>

        </section>
    );    
}

export default MoviesCardList;

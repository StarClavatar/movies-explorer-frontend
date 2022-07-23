import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    return (
        <section className="movies">
            <ul className="movies__list">
                <li className="movie">
                    <MovieCard />
                </li>
                <li className="movie">
                    <MovieCard />
                </li>
                <li className="movie">
                    <MovieCard />
                </li>
                <li className="movie">
                    <MovieCard />
                </li>
                <li className="movie">
                    <MovieCard />
                </li>
                <li className="movie">
                    <MovieCard />
                </li>
            </ul>

            <button className="button  movies__more-button">Ещё</button>

        </section>
    );    
}

export default MoviesCardList;

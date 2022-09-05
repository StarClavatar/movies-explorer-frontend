import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies(props) {
    return (
        <>
            <SearchForm onSearch={props.onSearch} />
            <MoviesCardList 
                isLoading={props.isLoading}
                movies={props.movies}
                favoriteHandler={props.favoriteHandler} 
            />
        </>    
    );    
}

export default Movies;

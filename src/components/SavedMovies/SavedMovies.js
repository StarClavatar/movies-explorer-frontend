import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies(props) {
    return (
        <>
            <SearchForm/>
            <MoviesCardList />
        </>
    );    
}

export default SavedMovies;

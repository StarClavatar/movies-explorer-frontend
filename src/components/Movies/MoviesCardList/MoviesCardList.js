import './MoviesCardList.css';
import React from 'react';
import Preloader from '../../Preloader/Preloader'; 
import MovieCard from '../MoviesCard/MoviesCard';


function useCardShowParams() {
    const getCardsShowParams = (windowWidth) => {
        if (windowWidth>=1280) {return {total: 12, step: 3}}
        if (windowWidth>768 && windowWidth<1280) {return {total: 8, step: 2}}
        if (windowWidth>480 && windowWidth<768) {return {total: 5, step: 2}}
        if (windowWidth>=1 && windowWidth<=480) {return {total: 5, step: 2}}
    }
    const [cardsShowParams, setCardsShowParams] = React.useState(getCardsShowParams(window.innerWidth));
    React.useEffect(
        () => {
            const updateCardsShowParams = () => {
                setCardsShowParams(getCardsShowParams(window.innerWidth))
            };

            window.addEventListener("resize", updateCardsShowParams);
            return () => window.removeEventListener("resize", updateCardsShowParams);
        },
        []
    );
    return cardsShowParams;
}

function MoviesCardList(props) {
    const cardsShowParams = useCardShowParams();
    const [cardsToShow, setCardsToShow] = React.useState(cardsShowParams.total);

    // загружаем карточки, если мы в режиме сохраненных фильмов
    React.useEffect(
        ()=>{
            function loadMoviesHandler() {
                props.loadMovies()
            };
            if (props.savedMoviesMode) loadMoviesHandler();
        },
        []
    );

    function moreClickHandler() {
        setCardsToShow(cardsToShow + cardsShowParams.step);
    };  

    // идет загрузка
    if (props.isLoading) {
        if (cardsToShow!==cardsShowParams.total) {setCardsToShow(cardsShowParams.total);}
        return (<div><Preloader /></div>);
    }

    // еще ничего не искали
    if (props.movies===undefined){
        return (<></>)
    }

    // остальные статусы поиска
    if (props.movies===null){
        return (
            <div>
                Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.
            </div>
        );
    } else if (props.movies.length===0) {
        return (<div>Ничего не найдено.</div>);
    } else {
        if (props.savedMoviesMode && cardsToShow!==props.movies.length) setCardsToShow(props.movies.length);
        return (
            <section className="movies">
                <ul className="movies__list">
                    {props.movies.map((movie, i) => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie}
                            shown={i<=cardsToShow-1}
                            favoriteHandler={props.favoriteHandler} 
                            savedMoviesMode={props.savedMoviesMode}
                        />
                    ))}
                </ul>
                <button 
                    className={`button movies__more-button${props.movies.length<=cardsToShow ? ' movies__more-button_hidden' : ''}`} 
                    onClick={moreClickHandler}>
                    Ещё
                </button>
            </section>
        );    
    }
}

export default MoviesCardList;

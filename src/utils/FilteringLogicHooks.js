import React from 'react';
import MoviesApi from '../utils/MoviesApi';

export function useMoviesLogic(Api) {
    const [moviesList, setMoviesList] = React.useState(undefined);
    const [savedMoviesList, setSavedMoviesList] = React.useState(undefined);
    const [savedMoviesFiltered, setSavedMoviesFiltered] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);

    function moviesSearchHandler(searchText, shorts) {
        setLoading(true);
        // запрашиваем все вильмы и все сохраненные одними промисом
        Promise.all([MoviesApi.getMovies(), Api.getSavedMovies()])
        .then(([movies, savedMovies])=>{
            // фильтруем массив полученных фильмов
            const filtered = filterMovies(movies, searchText, shorts);
            // добавляем свойства наличия в сохраненных и исправляем ссылки
            filtered.forEach(item => {
                // ищем в сохраненных и добавляем свойство savedMovieId если фильм найден  
                const sm = savedMovies.find(({movieId})=>movieId===item.id);
                item.savedMovieId=sm ? sm._id : null;
                // исправляем сcылки
                item.imageLink=MoviesApi.baseUrl() + '/' + item.image.url
                item.thumbnailLink=MoviesApi.baseUrl() + '/' + item.image.formats.thumbnail.url;
            });
            setLoading(false);
            setMoviesList(filtered);
        })
        .catch(err=>{
            setLoading(false);
            console.log(err);
            setMoviesList(null);
        });
    }

    function loadSavedMovies() {
        // устанавливаем признак загрузки данных
        setLoading(true);
        Api.getSavedMovies()
        .then((res)=>{
            // добавляем свойства для унификации с карточками фильмов
            res.forEach(item=>{
                // приводим элемент массива к единому виду
                item.id=item._id
                item.savedMovieId=item._id;
                item.imageLink=item.image;
                item.thumbnailLink=item.thumbnail;
            })
            // снимаем признак загрузки данных
            setLoading(false);
            setSavedMoviesFiltered(res);
            setSavedMoviesList(res);
        })
        .catch(err=>{
            // снимаем признак загрузки данных
            setLoading(false);
            console.log(err);
        });
    }    

    function savedMoviesFilterHandler(searchText, shorts) {
        setSavedMoviesFiltered(filterMovies(savedMoviesList,searchText,shorts));
    }

    function filterMovies(data, searchText, shorts) {
        const regEx = new RegExp(searchText,'i')
        return data.filter(item=>regEx.test(item.nameRU) && item.duration<=(shorts ? 40 : 9999999))
    }

    function favoriteHandler(movie) {
        // приводим карточку фильма к виду, пригодному для сохранения
        const mv = {
            // country: movie.country ? movie.country : '  ',
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: movie.imageLink,
            trailerLink: movie.trailerLink,
            thumbnail: movie.thumbnailLink,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN
        }

        // в зависимости от наличия сохраненнонго фильма используем либо функцию добавления либо удаления, не теряя контекст
        const func = movie.savedMovieId ? Api.deleteMovie.bind(Api) : Api.saveMovie.bind(Api);
        
        // вызываем функцию с параметром новой карточки или id карточки, которую надо удалить
        func(movie.savedMovieId ? movie.savedMovieId : mv)
        .then((res)=>{
            movie.savedMovieId=movie.savedMovieId ? null : res._id;
            setMoviesList(prev=>{return prev.map(c=>c.id===movie.id ? movie : c)});
        })
        .catch((err)=>{
            console.log(err);
        })

    } 

    function removeSavedMovieHandler(movie) {
        Api.deleteMovie(movie._id)
        .then(res=>{
            if (savedMoviesList && savedMoviesList.length>0) 
                setSavedMoviesList(savedMoviesList.filter(item=>item._id!==movie._id));
            if (savedMoviesFiltered && savedMoviesFiltered.length>0)
                setSavedMoviesFiltered(savedMoviesFiltered.filter(item=>item._id!==movie._id));
        })
        .catch(err=>console.log(err))
    }

    function clearAllMovies() {
        setSavedMoviesFiltered(undefined);
        setSavedMoviesList(undefined);
        setMoviesList(undefined);
        localStorage.removeItem('searchParams');
    }

    return {
            moviesList, 
            savedMoviesFiltered, 
            loading, 
            moviesSearchHandler, 
            savedMoviesFilterHandler,
            loadSavedMovies, 
            favoriteHandler, 
            removeSavedMovieHandler,
            clearAllMovies
    }

}
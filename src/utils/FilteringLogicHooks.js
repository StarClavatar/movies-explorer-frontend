import React from 'react';
import MoviesApi from '../utils/MoviesApi';
import { SHORTS_THRESHOLD } from '../constants/constants';

export function useMoviesLogic(Api) {
    const [moviesListSrc, setMoviesListSrc] = React.useState(undefined);
    const [moviesList, setMoviesList] = React.useState(undefined);
    const [savedMoviesList, setSavedMoviesList] = React.useState(undefined);
    const [savedMoviesFiltered, setSavedMoviesFiltered] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    // const [needRefreshSavedMovies, setNeedRefreshSavedMovies] = React.useState(false);


    function moviesSearchHandler(searchText, shorts) {
        setLoading(true);
        const dataToLoad = [null,null];
        if (!moviesListSrc) dataToLoad[0]=MoviesApi.getMovies();
        if (!savedMoviesList) dataToLoad[1]=Api.getSavedMovies();
        // запрашиваем все фильмы и все сохраненные одними промисом
        Promise.all(dataToLoad)
        .then(([movies, savedMovies])=>{
            // сохраняем данные в стейте
            movies ? setMoviesListSrc(movies) : movies=moviesListSrc;
            if (savedMovies) {
                setSavedMoviesList(normalizeSavedMovies(savedMovies)); 
                setSavedMoviesFiltered(savedMovies)
            } else { 
                savedMovies=savedMoviesList;
            }    

            // фильтруем массив полученных фильмов
            // let filtered; 
            // if (searchText) {
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
            // } else {
            //     filtered=undefined;
            // }
            setLoading(false);
            setMoviesList(filtered);
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
            setMoviesList(null);
        });
    }

    function loadSavedMovies() {
        // проверяем есть ли загруженный массив карточек
        if (savedMoviesList) return;       
        // устанавливаем признак загрузки данных
        setLoading(true);
        Api.getSavedMovies()
        .then((res)=>{
            // добавляем свойства для унификации с карточками фильмов
            normalizeSavedMovies (res);
            // снимаем признак загрузки данных
            setLoading(false);
            setSavedMoviesFiltered(res);
            setSavedMoviesList(res);
        })
        .catch(err=>{
            console.log(err);
            // снимаем признак загрузки данных
            setLoading(false);
        });
    }    


    function normalizeSavedMovies(data) {
        data.forEach(item=>{
                    item.id=item._id
                    item.savedMovieId=item._id;
                    item.imageLink=item.image;
                    item.thumbnailLink=item.thumbnail;
        })
    }


    function savedMoviesFilterHandler(searchText, shorts) {
        if (!savedMoviesList) return undefined;
        setSavedMoviesFiltered(filterMovies(savedMoviesList, searchText, shorts));
    }

    function filterMovies(data, searchText, shorts) {
        const regEx = new RegExp(searchText,'i')
        return data.filter(item=>regEx.test(item.nameRU) && item.duration<=(shorts ? SHORTS_THRESHOLD : 9999999))
    }

    function favoriteHandler(movie) {
        // приводим карточку фильма к виду, пригодному для сохранения
        const mv = {
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
            // выставляем признак того, что список сохраненных карточек надо перезагрузить
            setSavedMoviesList(undefined);
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
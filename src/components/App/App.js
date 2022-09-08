import "./App.css";

import React from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import PageWrapper from '../PageWrapper/PageWrapper';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import LogIn from '../Login/Login';
import Register from '../Register/Register';
import InfoToolTip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Api from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import * as Auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Navigation from "../Navigation/Navigation";


function App(props) {
    let navigate = useNavigate();

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [moviesList, setMoviesList] = React.useState(undefined);
    const [savedMoviesList, setSavedMoviesList] = React.useState(undefined);
    const [savedMoviesFiltered, setSavedMoviesFiltered] = React.useState(undefined);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipIsOk, setTooltipIsOk] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const handleInfoTolltipOpen = (tooltipMessage, tooltipIsOk) => {
        setTooltipIsOk(tooltipIsOk);
        setTooltipMessage(tooltipMessage);
        setIsInfoTooltipOpen(true); 
    };

    const handleNavigationOpen = ()=>setIsNavigationOpen(true);
    
    React.useEffect( 
        ()=>{
            const tkn = localStorage.getItem('token');
            // проверяем токен пользователя
            if (tkn) {
                Auth.checkToken(tkn)
                .then((res) => {
                    if (res) { 
                        //загружаем токен для запросов API
                        Api.loadToken();
                        //устанавливаем текущего пользователя
                        setCurrentUser(res);
                    }
                })
                .catch(err=>console.log(err))
            }
            //возвращаем функцию, которую вызовет реакт при завершении приложения
            return(()=>{
                localStorage.removeItem('searchParams');
            });
        },
        [setCurrentUser] 
    );

    const closeAllPopups = () => {
        setIsInfoTooltipOpen(false);
        setIsNavigationOpen(false);
    }

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

    function handleRegister (name, email, password) {
        Auth.register(name, email, password)
        .then((res) => {
            let msg;
            let isAuthed=false;
            if (res.code===200) {
                console.log(res);
                msg = 'Вы успешно \n зарегистрировались!';
                isAuthed = true;
            } else if (res.code===409) {
                msg = res.body.message;
            } else {
                msg = 'Что-то пошло не так. \n Попробуйте еще раз'
            }
            handleInfoTolltipOpen(msg, isAuthed);
        })
        .catch(err=>console.log(err));
    }

    function handleAuthorize(email, password) {
        Auth.authorize(email, password)
        .then((res) => {
            const {token, user} = res;
            if (token){
                localStorage.setItem('token',token);
                // загружаем токен для запросов API
                Api.loadToken();
                // устанавливаем активного пользователя
                setCurrentUser(user);
                // переходим на страницу после логина
                navigate('/');
            } else {
                handleInfoTolltipOpen('Неправильный \n логин или пароль', false);
            }
        })
        .catch(err=>{
            handleInfoTolltipOpen('Что-то пошло не так. \n попробуйте еще раз.', false);
        });
    }
    
    function handleSignOut() {
        setMoviesList([]);
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate('/');
    }

    function handleUpdateUser(userName, email){
        Api.patchProfile(email, userName)
        .then ((res)=>{
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(err=>{
            console.log(err)
            if (err.status===409) {
                handleInfoTolltipOpen('Указанный email уже занят. \n Попробуйте еще раз', false);
            } else if (err.message==='Failed to fetch') {
                handleInfoTolltipOpen('Проверьте соединение с интернетом. \n Попробуйте еще раз', false);
            } else {
                handleInfoTolltipOpen('Что-то пошло. \n Попробуйте еще раз', false);
            }
    })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Routes>
                    <Route path='/' element={<PageWrapper handleNavigationOpen={handleNavigationOpen}/>}>
                        <Route path='/' element={<Main />} />
                        <Route path='/movies' element={
                            <ProtectedRoute key='movies' component={Movies}
                                savedMoviesMode=''
                                isLoading={loading} 
                                movies={moviesList}
                                favoriteHandler={favoriteHandler}
                                onSearch={moviesSearchHandler}
                            />
                        }/>
                        <Route path='/saved-movies' element={
                            <ProtectedRoute key='savedMovies' component={Movies} 
                                savedMoviesMode='savedMovies'
                                loadMovies={loadSavedMovies}
                                isLoading={loading} 
                                movies={savedMoviesFiltered}
                                favoriteHandler={removeSavedMovieHandler}
                                onSearch={savedMoviesFilterHandler}                            
                            />
                        } />
                    </Route>
                    <Route path='/profile' element={
                        <ProtectedRoute component={Profile} 
                            onEditProfile={handleUpdateUser}
                            onSignOut={handleSignOut}
                        />
                    } />
                    <Route path='/signin' element={<LogIn onAuthorise={handleAuthorize}/>} />
                    <Route path='/signup' element={<Register onRegister={handleRegister}/>} />
                </Routes>
                <Navigation opened={isNavigationOpen} onClose={closeAllPopups}/>
                <InfoToolTip isOpen={isInfoTooltipOpen} tooltipMessage={tooltipMessage} tooltipIsOk={tooltipIsOk} onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;

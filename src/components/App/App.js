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
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import LogIn from '../Login/Login';
import Register from '../Register/Register';
import InfoToolTip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Api from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import * as Auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function App(props) {
    let navigate = useNavigate();

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [moviesList, setMoviesList] = React.useState(undefined);
    const [savedMoviesList, setSavedMoviesList] = React.useState(undefined);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipIsOk, setTooltipIsOk] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const handleInfoTolltipOpen = (tooltipMessage, tooltipIsOk) => {
        setTooltipIsOk(tooltipIsOk);
        setTooltipMessage(tooltipMessage);
        setIsInfoTooltipOpen(true); 
    };

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
    }

    function newSearchHandler(searchText, shorts) {
        setLoading(true);
        // запрашиваем все вильмы и все сохраненные одними промисом
        Promise.all([MoviesApi.getMovies(), Api.getSavedMovies()])
        .then(([movies, savedMovies])=>{
            // фильтруем массив полученных фильмов, добавляя свойства наличия в сохраненных
            const regEx = new RegExp(searchText,'i')
            const filtered = movies.filter((item)=>{
                if (regEx.test(item.nameRU) && item.duration<=(shorts ? 20 : 9999999)){
                    // ищем в сохраненных и добавляем свойство savedMovieId если фильм найден  
                    const sm = savedMovies.find(({movieId})=>movieId===item.id);
                    item.savedMovieId=sm ? sm._id : null;
                    item.imageLink=MoviesApi.baseUrl() + '/' + item.image.url
                    item.thumbnailLink=MoviesApi.baseUrl() + '/' + item.image.formats.thumbnail.url;
                    return true;
                }
                return false;
            })
            setMoviesList(filtered);

            setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
            console.log(err);
        });
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

    function favoriteHandler(movie) {
        const mv = {
            country: movie.country ? movie.country : '  ',
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

    function handleRegister (name, email, password) {
        Auth.register(name, email, password)
        .then((res) => {
            let msg;
            let isAuthed=false;
            if (res.code===200) {
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
                setCurrentUser(user);
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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Routes>
                    <Route path='/' element={<PageWrapper/>}>
                        <Route path='/' element={<Main />} />
                        <Route path='/movies' element={
                            <ProtectedRoute component={Movies}
                                baseUrl={MoviesApi.baseUrl()}
                                isLoading={loading} 
                                movies={moviesList}
                                favoriteHandler={favoriteHandler}
                                onSearch={newSearchHandler}
                            />
                        }/>
                        <Route path='/saved-movies' element={
                            <ProtectedRoute component={SavedMovies} 
                                // moviesAr={}
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
                <InfoToolTip isOpen={isInfoTooltipOpen} tooltipMessage={tooltipMessage} tooltipIsOk={tooltipIsOk} onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;

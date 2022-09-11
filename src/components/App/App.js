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
import LoadingError from '../LoadingError/LoadingError'

import Api from '../../utils/MainApi';
import * as Auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Navigation from "../Navigation/Navigation";
import useMoviesLogic from '../../utils/FilteringLogicHooks';


function App(props) {
    let navigate = useNavigate();

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipIsOk, setTooltipIsOk] = React.useState(false);
    
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

    // подключаем логику работы с фильмами
    const {
        moviesList, 
        savedMoviesFiltered, 
        loading, 
        moviesSearchHandler, 
        savedMoviesFilterHandler,
        loadSavedMovies, 
        favoriteHandler, 
        removeSavedMovieHandler,
        clearAllMovies
    } = useMoviesLogic (Api);

    const closeAllPopups = () => {
        setIsInfoTooltipOpen(false);
        setIsNavigationOpen(false);
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
        clearAllMovies();
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

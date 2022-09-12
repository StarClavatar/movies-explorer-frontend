import "./App.css";

import React from 'react';
import {
  Routes,
  Route,
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
import Navigation from "../Navigation/Navigation";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { useAuthRegister } from '../../utils/AuthRegHooks';
import { useMoviesLogic } from '../../utils/FilteringLogicHooks';

import Api from '../../utils/MainApi';



function App(props) {
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipIsOk, setTooltipIsOk] = React.useState(false);
    
    const handleInfoTolltipOpen = (tooltipMessage, tooltipIsOk) => {
        setTooltipIsOk(tooltipIsOk);
        setTooltipMessage(tooltipMessage);
        setIsInfoTooltipOpen(true); 
    };

    // открываем попап навигации по нажатию на бутер
    const handleNavigationOpen = ()=>setIsNavigationOpen(true);

    // подключаем логику работы с фильмами из своего кастомного хука
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

    // регистрация, авторизация
    const {
        currentUser,
        handleRegister,
        handleAuthorize,
        handleSignOut,
        handleUpdateUser
    } = useAuthRegister(Api, handleInfoTolltipOpen, clearAllMovies)

    // закрываем все попапы
    const closeAllPopups = () => {
        setIsInfoTooltipOpen(false);
        setIsNavigationOpen(false);
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
                    <Route path='*' element={<LoadingError />} />
                </Routes>
                <Navigation opened={isNavigationOpen} onClose={closeAllPopups}/>
                <InfoToolTip isOpen={isInfoTooltipOpen} tooltipMessage={tooltipMessage} tooltipIsOk={tooltipIsOk} onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;

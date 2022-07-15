import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import LogIn from '../Login/Login';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

function App(props) {

    return (
            <Router>
                <div className='page'>
                    <Header/>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/saved-movies" element={<SavedMovies />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/signin" element={<LogIn />} />
                        <Route path="/signup" element={<Register />} />
                    </Routes>
                    <Footer /> 
                </div>
            </Router>
                 
    );
}
export default App;

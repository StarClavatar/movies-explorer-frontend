import React from 'react';
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // Outlet,
  // useParams
} from 'react-router-dom';

// import EditProfilePopup from './EditProfilePopup';

import Main from '../Main/Main';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Profile from '../Profile/Profile';

// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import InfoToolTip from '../InfoTooltip/InfoTooltip';
import Api from '../../utils/Api';
import * as Auth from '../../utils/Auth';
import LogIn from '../Login/Login';
import Register from '../Register/Register';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function App(props) {
    // const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    // const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    // const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({name:'',link:'',about:''});
    // const [selectedCard, setSelectedCard] = React.useState(null);
    // const [cards, setCards] = React.useState([]);
    const [email,setEmail] = React.useState('');
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipIsOk, setTooltipIsOk] = React.useState(false);
    
    // const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) };
    // const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true) }; 
    // const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true) };
    // const handleCardClick = (link) => { setSelectedCard(link) };

    const handleInfoTolltipOpen = (tooltipMessage, tooltipIsOk) => {
        setTooltipIsOk(tooltipIsOk);
        setTooltipMessage(tooltipMessage);
        setIsInfoTooltipOpen(true); 
    };
    
    React.useEffect( ()=>{handleTokenCheck()},[] );

    React.useEffect( 
        ()=>{
            if (email) {
                // 
                Api.loadToken();
                //загружаем профиль пользователя и карточки
                // Promise.all([Api.getProfile(), Api.getInitialCards()])
                // .then(([profile, cards]) => {
                //     //отображаем информацию профиля    
                //     setCurrentUser(profile);
                //     //рисуем все карточки
                //     setCards(cards);
                // })
                // .catch(err => { console.log(err) })
            } else {
                setCurrentUser({});
                // setCards([]);
            }
        },
        [email]);

    const closeAllPopups = () => {
        // setIsEditProfilePopupOpen(false);
        // setIsAddPlacePopupOpen(false);
        // setIsEditAvatarPopupOpen(false);
        // setIsInfoTooltipOpen(false);
        // setSelectedCard(null);
    }

    // function handleUpdateUser(user){
    //     Api.patchProfile(user.name,user.about)
    //     .then ((res)=>{
    //         setCurrentUser(res);
    //         closeAllPopups();
    //     })
    //     .catch(err=>console.log(err))
    // }

    // function handleUpdateAvatar(avatarUrl){
    //     Api.patchProfilePhoto(avatarUrl)
    //     .then ((res)=>{
    //         setCurrentUser(res);
    //         closeAllPopups();
    //     })
    //     .catch(err=>console.log(err))   
    // }

    // function handleAddPlaceSubmit(card){
    //     Api.createNewCard(card.name, card.link)
    //     .then ((newCard)=>{
    //         setCards([newCard,...cards]);
    //         closeAllPopups();
    //     })
    //     .catch(err=>console.log(err))   
    // }

    // function handleCardLike(card) {
    //     // Снова проверяем, есть ли уже лайк на этой карточке
    //     const isLiked = card.likes.some(i => i._id === currentUser._id);
    //     // Отправляем запрос в API и получаем обновлённые данные карточки
    //     Api.updateLikeStatus(card._id, !isLiked)
    //     .then((newCard) => {
    //         setCards((prevState)=>{return prevState.map((c) => c._id === card._id ? newCard : c)});
    //     })
    //     .catch(err=>console.log(err));
    // } 

    // function handleCardDelete(card){
    //     Api.deleteCard(card._id)
    //     .then (res=>{
    //         console.log (res)
    //         setCards ((prevState)=> prevState.filter((c) => c._id !== card._id && c));
    //     })
    //     .catch(err=>console.log(err));
    // }

    function handleTokenCheck(){
        const token = localStorage.getItem('token');
        if (token) {
            // проверяем токен пользователя
            Auth.checkToken(token)
            .then((res) => {
                if (res) { 
                    handleLogin(res.data ? res.data.email : res.email); 
                }
            })
            .catch(err=>console.log(err))
        }; 
    }

    function handleRegister (email,password) {
        Auth.register(email, password)
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

    function handleAuthorize(email,password) {
        Auth.authorize(email, password)
        .then((data) => {
            if (data.token){
                localStorage.setItem('token',data.token);
                handleLogin(email);
            } else {
                handleInfoTolltipOpen('Неправильный \n логин или пароль', false)
            }
        })
        .catch(err=>handleInfoTolltipOpen('Что-то пошло не так. \n попробуйте еще раз.', false));
    }
    
    function handleSignOut() {
        // setCards([]);
        setEmail('');
        localStorage.removeItem('token');
    }

    function handleLogin(email){
        setEmail(email);
        props.history.push('/main');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Router>
                <Header emal={email} onSignOut={handleSignOut}/>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/saved-movies" element={<SavedMovies />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/signin" element={<LogIn />} />
                  <Route path="/signup" element={<Register />} />
                      {/* <ProtectedRoute
                          component={Main}
                          email={email}
                          onEditProfile={handleEditProfileClick} 
                          onAddPlace={handleAddPlaceClick} 
                          onEditAvatar={handleEditAvatarClick} 
                          cards={cards}
                          onCardLike={handleCardLike}
                          onCardClick={handleCardClick}
                          onCardDelete={handleCardDelete}
                      /> */}
                      {/* <EditProfilePopup 
                          isOpen={isEditProfilePopupOpen} 
                          onUpdateUser={handleUpdateUser} 
                          onClose={closeAllPopups}
                      />  
                      <AddPlacePopup 
                          isOpen={isAddPlacePopupOpen} 
                          onAddPlace={handleAddPlaceSubmit} 
                          onClose={closeAllPopups}
                      />
                      <EditAvatarPopup 
                          isOpen={isEditAvatarPopupOpen} 
                          onUpdateAvatar={handleUpdateAvatar} 
                          onClose={closeAllPopups} 
                      /> 
                      <ImagePopup 
                          link={selectedCard} 
                          onClose={closeAllPopups} 
                      /> */}
                  {/* <Redirect to={email ? '/' : '/sign-in'} /> */}
              </Routes>
            </Router>
            <InfoToolTip isOpen={isInfoTooltipOpen} tooltipMessage={tooltipMessage} tooltipIsOk={tooltipIsOk} onClose={closeAllPopups}/>
            <Footer />      
        </CurrentUserContext.Provider>
    );
}

// export default withRouter(App);
export default App;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Auth from '../utils/Auth';

export function useAuthRegister(Api, handleInfoTolltipOpen, clearAllMovies) {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = React.useState(null);

    // загружаем и проверяем сохраненный ранее токен, логинимся если токен действительный
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
        [setCurrentUser, Api] 
    );

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

    return {
        currentUser,
        handleRegister,
        handleAuthorize,
        handleSignOut,
        handleUpdateUser
    }

}


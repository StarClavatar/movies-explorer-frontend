import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Auth from '../utils/Auth';

export function useAuthRegister(Api, handleInfoTolltipOpen, clearAllMovies) {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = React.useState(null);
    const [loadingToken, setLoadingToken] = React.useState(true);

    // загружаем и проверяем сохраненный ранее токен, логинимся если токен действительный
    React.useEffect( 
        ()=>{
            Api.unAuthorizedCallBack (handleSignOut);
            const tkn = localStorage.getItem('token');
            // проверяем токен пользователя
            if (tkn) {
                // setLoadingToken(true);
                Auth.checkToken(tkn)
                .then((res) => {
                    if (res) { 
                        //устанавливаем текущего пользователя
                        setCurrentUser(res);
                    }
                    setLoadingToken(false);
                })
                .catch(err=>{
                    setLoadingToken(false);
                    console.log(err);
                    err.json()
                    .then(res=>console.log(res))
                })
            } else {setLoadingToken(false);}
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
            handleAuthorize (email, password);
            return;
        })
        .catch(res=>{
            console.log(res);
            if (res.status===409) {
                res.json()
                .then(data=>{
                    handleInfoTolltipOpen(data.message, false);
                })
            } else {
                // msg = 'Что-то пошло не так. \n Попробуйте еще раз'
                handleInfoTolltipOpen('Что-то пошло не так. \n Попробуйте еще раз', false);
            }
        });
    }
    
    function handleAuthorize(email, password) {
        Auth.authorize(email, password)
        .then((res) => {
            const {token, user} = res;
            if (token){
                // сохраняем токен
                localStorage.setItem('token',token);
                // устанавливаем активного пользователя
                setCurrentUser(user);
                // переходим на страницу после логина
                navigate('/movies');
            }
        })
        .catch(res=>{
            if (res.status===401) {
                handleInfoTolltipOpen('Неправильный \n логин или пароль', false);
            } else {
                handleInfoTolltipOpen('Что-то пошло не так. \n попробуйте еще раз.', false);
            }
        });
    }
    
    function handleSignOut() {
        clearAllMovies();
        localStorage.removeItem('token');
        localStorage.removeItem('searchParams');
        setCurrentUser(null);
        navigate('/');
    }
    
    function handleUpdateUser(userName, email){
        Api.patchProfile(email, userName)
        .then ((res)=>{
            setCurrentUser(res);
            handleInfoTolltipOpen('Изменения в профиле успешно сохранены.', true);
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
        loadingToken,
        handleRegister,
        handleAuthorize,
        handleSignOut,
        handleUpdateUser
    }

}


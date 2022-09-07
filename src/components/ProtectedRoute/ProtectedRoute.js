import React from 'react';
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// {component:Component, ...props} - это не объект, это деструктуризация! 
// на выходе из этого выражения из объекта props значение свойства
// component запишется в новую переменную Component, из объеекта props
// удалиться свойство component и объект props будет передан вторым параметром функции               
// https://learn.javascript.ru/destructuring?ysclid=l4yld617ci293656923
const ProtectedRoute = ({ component: Component, ...props  }) => {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <>
      {
        currentUser ? <Component {...props} /> : <Navigate to="/signin" />
      }
    </>
)}

export default ProtectedRoute;
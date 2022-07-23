import React from 'react';
import { Route, Redirect } from "react-router-dom";

// {component:Component, ...props} - это не объект, это деструктуризация! 
// на выходе из этого выражения из объекта props значение свойства
// component запишется в новую переменную Component, из объеекта props
// удалиться свойство component и объект props будет передан вторым параметром функции               
// https://learn.javascript.ru/destructuring?ysclid=l4yld617ci293656923
const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => props.email ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
)}

export default ProtectedRoute;
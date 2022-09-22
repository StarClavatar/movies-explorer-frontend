import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/FormHooks';
import { USER_NAME_REGEXP, EMAIL_REGEXP } from '../../constants/constants'

import './Profile.css';


function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const { values, handleChange, errors, isValid } = useFormWithValidation({user: currentUser.name, email: currentUser.email});
    
    function handleSubmit(e){
        e.preventDefault();
        props.onEditProfile(values.user, values.email);
    }

    //отлючаем кнопку, если поля невалидные или если нет изменений
    let buttonState = !isValid ? {disabled: 'disabled'} : {};
    if (currentUser.name===values.user && currentUser.email===values.email) buttonState = {disabled: 'disabled'};

    return (
        <div>
            <section className="profile-form">
                <h1 className="profile-form__heading">{`Привет, ${currentUser.name}!`}</h1>
                <form className="profile-form__form" onSubmit={handleSubmit}>
                    <div className="profile-form__form-wrapper">
                        <span className="profile-form-input__title">Имя</span>
                        <input className="profile-form-input" 
                            name="user"
                            placeholder="Введите имя"
                            autoFocus
                            required 
                            type="text" 
                            pattern={USER_NAME_REGEXP}
                            onInput={e => {
                                e.target.setCustomValidity("");
                                if (!e.target.validity.valid) 
                                e.target.setCustomValidity("Только латиница, кирилица, пробел или дефис")}
                            }  
                            onChange={handleChange}
                            value={values.user ? values.user : ''} 
                        />
                        <span className={`profile-error-span${errors.user ? ' error-span_active' : ''}`} >{errors.user}</span>
                    </div>
                    <div className="profile-form__form-wrapper">
                        <span className="profile-form-input__title">email</span>
                        <input className="profile-form-input" 
                            name="email"
                            required 
                            type="text" 
                            placeholder="E-mail" 
                            pattern={EMAIL_REGEXP}
                            onInput={e => {
                                e.target.setCustomValidity("");
                                if (!e.target.validity.valid) 
                                e.target.setCustomValidity("Введите корректный адрес электронной почты")}
                            }  
                            onChange={handleChange} 
                            value={values.email ? values.email : ''}
                        />
                        <span className={`profile-error-span${errors.email ? ' error-span_active' : ''}`} >{errors.email}</span>
                    </div>
                    <div className="button-container">
                        <button 
                            className="form-button form-button_edit"
                            type="submit"
                            {...buttonState}
                        >Редактировать
                        </button>
                        <button className="form-button form-button_quit" onClick={props.onSignOut}>Выйти из аккаунта</button>
                    </div>
                </form>
            </section>
        </div>    
    );    
}

export default Profile;

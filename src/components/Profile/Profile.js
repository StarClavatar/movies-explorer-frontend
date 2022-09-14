import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/FormHooks';

import './Profile.css';


function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({user: currentUser.name, email: currentUser.email});
    
    function handleSubmit(e){
        e.preventDefault();
        props.onEditProfile(values.user, values.email);
    }

    return (
        <div>
            <section className="profile-form">
                <h1 className="profile-form__heading">{`Привет, ${currentUser.name}!`}</h1>
                <form className="profile-form__form" onSubmit={handleSubmit}>
                    <div className="profile-form__form-wrapper">
                        <span className="profile-form-input__title">Имя</span>
                        <input className="profile-form-input" 
                            name="user"
                            required 
                            type="text" 
                            placeholder="Введите имя" 
                            value={values.user ? values.user : ''} 
                            onChange={handleChange}
                        />
                        <span className={`profile-error-span${errors.user ? ' error-span_active' : ''}`} >{errors.user}</span>
                    </div>
                    <div className="profile-form__form-wrapper">
                        <span className="profile-form-input__title">email</span>
                        <input className="profile-form-input" 
                            name="email"
                            required 
                            type="email" 
                            placeholder="E-mail" 
                            value={values.email ? values.email : ''}
                            onChange={handleChange} 
                        />
                        <span className={`profile-error-span${errors.email ? ' error-span_active' : ''}`} >{errors.email}</span>
                    </div>
                    <div className='button-container'>
                        <button 
                            className="form-button form-button_edit"
                            type="submit"
                            {...!isValid ? {disabled: 'disabled'} : {}}
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

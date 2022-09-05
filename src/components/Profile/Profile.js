import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';


function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState ('');
    const [email, setEmail] = React.useState ('');

    React.useEffect(
        ()=>{
           setName(currentUser.name);
           setEmail(currentUser.email); 
        },
        []
    );

    function handleNameChange(e) {setName(e.target.value)};
    function handleEmailChange(e) {setEmail(e.target.value)};

    function handleSubmit(e){
        e.preventDefault();
        props.onEditProfile(name, email);
    }

    return (
        <div>
            <section className="profile-form">
                <h1 className="profile-form__heading">{`Привет, ${currentUser.name}!`}</h1>
                <form className="profile-form__form" onSubmit={handleSubmit}>
                    <div className="profile-form__form-wrapper">
                        <span className="profile-form-input__title">Имя</span>
                        <input className="profile-form-input" 
                            required 
                            type="text" 
                            placeholder="Введите имя" 
                            value={name} 
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="profile-form__form-wrapper">
                        <span className="profile-form-input__title">E-mail</span>
                        <input className="profile-form-input" 
                            required 
                            type="email" 
                            placeholder="E-mail" 
                            value={email} 
                            onChange={handleEmailChange} 
                        />
                    </div>
                    <div className='button-container'>
                    <button className="form-button form-button_edit" type="submit">Редактировать</button>
                    <button className="form-button form-button_quit" onClick={props.onSignOut}>Выйти из аккаунта</button>
                    </div>
                </form>
            </section>
        </div>    
    );    
}

export default Profile;

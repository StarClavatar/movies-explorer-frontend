import './Profile.css';

function Profile(props) {
    return (
        <div>
            <section className="profile-form">
            <h1 className="profile-form__heading">Привет, Батя!</h1>
            <form className="profile-form__form">
                <div className="profile-form__form-wrapper">
                    <span className="profile-form-input__title">Имя</span>
                    <input className="profile-form-input" required type="text" />
                </div>
                <div className="register__form-wrapper">
                    <span className="profile-form-input__title">E-mail</span>
                    <input className="profile-form-input" required type="text" />
                </div>
            </form>
            <a href="#" className="edit">Редактировать</a>
            <a href="#" className="quit">Выйти из аккаунта</a>
        </section>
        </div>    
    );    
}

export default Profile;

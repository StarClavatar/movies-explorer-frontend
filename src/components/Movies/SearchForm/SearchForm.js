import './SearchForm.css';
import searchIcon from '../../../images/search-icon.svg'
import find from '../../../images/find.svg'


function SearchForm(props) {
    return (
            <section className="search-form">
                <div className='search-form__wrapper'>
                    <form className="search-form__form">
                        <div className="search-form__film-container">
                            <img src={searchIcon} alt="Значок поиска лупа" className="search-form__film-icon" />
                            <input className="search-form__film-input" type="text" placeholder="Фильм" required />
                            <button className="button search-form__find-button" style={{backgroundImage: `url(${find})`}} type="submit"></button>
                        </div>
                        <div className="form-filter">
                            <input className="form-filter__checkbox" type="checkbox" />
                            <p className="form-filter__subsription">Короткометражки</p>
                        </div>
                    </form>
                </div>
        </section>
    );    
}


export default SearchForm;

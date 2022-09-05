import React from 'react';
import './SearchForm.css';
import searchIcon from '../../../images/search-icon.svg'
import findIcon from '../../../images/find.svg'


function SearchForm(props) {
    const [searchText, setSearchText] = React.useState('');
    const [shorts, setShorts] = React.useState(false);

    React.useEffect(
        ()=>{
            const searchParams = JSON.parse(localStorage.getItem('searchParams'));
            if (searchParams && searchParams.searchText) {
                setSearchText(searchParams.searchText);
                setShorts (searchParams.shorts);
                props.onSearch (searchParams.searchText, searchParams.shorts)
            }
        },
        []
    );

    function searchTextChangeHandler(e) {setSearchText(e.target.value)};
    function shortsChangeHandler(e) {setShorts(e.target.checked)};

    function onSubmit(e) {
        e.preventDefault();
        props.onSearch (searchText, shorts);
        localStorage.setItem('searchParams', JSON.stringify({searchText, shorts}))
    }

    return (
            <section className="search-form">
                <div className='search-form__wrapper'>
                    <form className="search-form__form" onSubmit={onSubmit}>
                        <div className="search-form__film-container">
                            <img src={searchIcon} alt="Значок поиска лупа" className="search-form__film-icon" />
                            <input className="search-form__film-input" 
                                placeholder="Фильм" 
                                required
                                type="text" 
                                value={searchText}
                                onChange={searchTextChangeHandler}
                                onInvalid={e => e.target.setCustomValidity("Введите название фильма")}
                                onInput={e => e.target.setCustomValidity("")}
                            />
                            <button className="button search-form__find-button" 
                                type="submit"
                                style={{backgroundImage: `url(${findIcon})`}} 
                            />
                        </div>
                        <div className="form-filter">
                            <input className="form-filter__checkbox" 
                                type="checkbox" 
                                checked={shorts}
                                onChange={shortsChangeHandler}
                            />
                            <p className="form-filter__subsription">Короткометражки</p>
                        </div>
                    </form>
                </div>
        </section>
    );    
}


export default SearchForm;

import './LoadingError.css'
import { useNavigate } from 'react-router-dom';

function LoadingError() {
    let navigate = useNavigate(); 

    function goBack () {
        navigate (-1);
    }

    return (
        <div className='loading-error'>
            <h2 className='loading-error__heading'>404</h2>
            <p className='loading-error__paragraph'>Страница не найдена</p>
            <a className='loading-error__back-link' href="#" onClick={goBack}>Назад</a>
        </div>
    )
}

export default LoadingError

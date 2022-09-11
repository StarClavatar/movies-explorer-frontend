import './LoadingError.css'

function LoadingError() {
    return (
        <div className='loading-error'>
            <h2 className='loading-error__heading'>404</h2>
            <p className='loading-error__paragraph'>Страница не найдена</p>
            <a className='loading-error__back-link' href="/">Назад</a>
        </div>
    )
}

export default LoadingError

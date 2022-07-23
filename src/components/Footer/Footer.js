import './Footer.css';

function Footer(props) {

    return (
        <footer className="footer">
            <h5 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h5>
            <div className="footer-info">
                <p className="footer-info__copyright">© 2020</p>
                <div className="footer-info__links">
                    <a 
                        className="footer-info__link link" 
                        href="https://practicum.yandex.ru" 
                        target="_blank" rel="noopener noreferrer">
                        Яндекс.Практикум
                    </a>
                    <a 
                        className="footer-info__link link" 
                        href="https://github.com/tupokaban/movies-explorer-frontend" 
                        target="_blank" rel="noopener noreferrer">
                        Github
                    </a>
                    <a  
                        className="footer-info__link link" 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer">
                        Facebook
                    </a>
                    {/* <Link to="https://practicum.yandex.ru" className="footer-info__link link">Яндекс.Практикум</Link>
                    <Link to="https://github.com/tupokaban/movies-explorer-frontend" className="footer-info__link link">Github</Link>
                    <Link to="https://facebook.com/" className="footer-info__link link">Facebook</Link> */}
                </div>
            </div>
        </footer>
    );    
}

export default Footer;

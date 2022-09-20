import myPhoto from '../../../images/meee.jpg';
import './AboutMe.css';

function AboutMe(props) {
    return (
        <section ref={props.aboutMeRef} className="section student">
            <h2 className="section-title student__title" id="student">Студент</h2>
            <div className="student-wrapper">
                <img className="student__photo" src={myPhoto} alt="Фотография студента" />
                <div className="student-wrapper__info">
                    <h3 className="student__name">Вячеслав</h3>
                    <h4 className="student__education">Фронтенд-разработчик, 21 год</h4>
                    <p className="student__about">Я родился и живу в Москве, в результате работы в разных местах, понял, что
                        я
                        хочу быть фронтенд-разработчиком и не продавать и помогать внедрять программные продукты, а
                        создавать их. Студент Московского финансово-юридического университета. Живу музыкально,
                        спортивно и
                        жизнерадостно. Люблю Битлз и Звёздные войны.</p>
                    <div className="student__socials">
                        <a className="student__social link" target="blank"
                            href="https://vk.com/superior_ublyudok">ВКонтакте</a>
                        <a className="student__social link" target="blank" href="https://github.com/tupokaban">Github</a>
                    </div>
                </div>
            </div>
            <h5 className="student__portfolio">Портфолио</h5>
            <div className="site-links">
                <a className="link site-links__link" target="blank"
                    href="https://github.com/tupokaban/first-project">Статичный сайт <svg width="18" height="17"
                        viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z"
                            fill="black" />
                    </svg>
                </a>
                <a className="link site-links__link" target="blank"
                    href="https://tupokaban.github.io/russian-travel/index.html">Адаптивный сайт <svg width="18"
                        height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z"
                            fill="black" />
                    </svg>
                </a>
                <a className="link site-links__link" target="blank"
                    href="https://github.com/tupokaban/react-mesto-auth">Одностраничное приложение <svg width="18"
                        height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z"
                            fill="black" />
                    </svg>
                </a>
            </div>
        </section>
    );    
}

export default AboutMe;

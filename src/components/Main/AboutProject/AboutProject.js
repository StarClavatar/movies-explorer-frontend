import './AboutProject.css';

function AboutProject(props) {
    return (
        <section ref={props.aboutRef} className="section about">
            <h2 className="section-title section__title_about" id="about-project">О проекте</h2>
            <div className="two-columns">
                <div className="column">
                    <h3 className="column__title">Дипломный проект включал 5 этапов</h3>
                    <p className="column__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.</p>
                </div>
                <div className="column">
                    <h3 className="column__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="column__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about__diagram">
                <div className="diagram-backend">
                    <div className="diagram__container">
                        <h3 className="diagram__cell diagram__cell_backend">1 неделя</h3>
                        <p className="diagram__caption">Back-end</p>
                    </div>
                </div>
                <div className="diagram-frontend">
                    <div className="diagram__container">
                        <h3 className="diagram__cell diagram__cell_frontend">4 недели</h3>
                        <p className="diagram__caption">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    );    
}

export default AboutProject;

import './AboutProject.css';

function AboutProject(props) {
    return (
        <section class="section about">
            <h2 class="section-title section__title_about" id="about-project">О проекте</h2>
            <div class="two-columns">
                <div class="column">
                    <h3 class="column__title">Дипломный проект включал 5 этапов</h3>
                    <p class="column__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.</p>
                </div>
                <div class="column">
                    <h3 class="column__title">На выполнение диплома ушло 5 недель</h3>
                    <p class="column__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div class="about__diagram">
                <div class="diagram-backend">
                    <div class="diagram__container">
                        <h3 class="diagram__cell diagram__cell_backend">1 неделя</h3>
                        <p class="diagram__caption">Back-end</p>
                    </div>
                </div>
                <div class="diagram-frontend">
                    <div class="diagram__container">
                        <h3 class="diagram__cell diagram__cell_frontend">4 недели</h3>
                        <p class="diagram__caption">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    );    
}

export default AboutProject;

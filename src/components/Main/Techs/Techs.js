import './Techs.css';

function Techs(props) {
    return (
        <section class="section technologies" id="technologies">
            <h2 class="section-title section__title_technologies">Технологии</h2>
            <h3 class="technologies__heading">7 технологий</h3>
            <p class="technologies__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в
                дипломном проекте.</p>
            <ul class="technologies__items">
                <li class="technologies__item">HTML</li>
                <li class="technologies__item">CSS</li>
                <li class="technologies__item">JS</li>
                <li class="technologies__item">React</li>
                <li class="technologies__item">Git</li>
                <li class="technologies__item">Express.js</li>
                <li class="technologies__item">mongoDB</li>
            </ul>
        </section>    
    );    
}

export default Techs;

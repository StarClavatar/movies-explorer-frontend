import './Preloader.css';

function Preloader(props) {
    return (
        <ul id="preloader">
            <li id="loading">
                <div id="dots">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </li>
        </ul>  
    );
}

export default Preloader;

// import './Login.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function PageWrapper(props) {
    return (
        <>
            <Header email={props.email} handleNavigationOpen={props.handleNavigationOpen}/>
            <Outlet />
            <Footer />
        </>    
    );    
}

export default PageWrapper;
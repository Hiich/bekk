import './Header.css'
import LouisBekk from '../../images/LouisBekk.png';

export const NavBar = () => {
    return(
        <div className='NavBarWithLogo background'>
            <img className='logo' src={LouisBekk} alt='logo' />
            <div className='NavBar'>
                <a className='text' href='#'>COLLECTION PREVIEW</a>
                <a className='text' href='#'>CONCEPT</a>
                <a className='text' href='#'>ROADMAP</a>
            </div>
        </div>
    );
}
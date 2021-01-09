import { useHistory } from 'react-router-dom';
import './landing.page.scss';
import NavBar from '../../components/nav-bar/nav-bar';

export default function Landing() {

    const history = useHistory();

    return (
        <div className="landing">
           <NavBar loggedIn={false}/>
           <div className="landing-punchline">Welcome to Daily Specials !</div>
           <button onClick={() => history.push('/login')} className="button-main">Log In</button>
           <button onClick={() => history.push('/sign-up')} className="button-main">Sign up</button>
        </div>
    );
}
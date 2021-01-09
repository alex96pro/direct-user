import './nav-bar.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../common/actions/auth.actions';

export default function NavBar(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logOut());
        localStorage.clear();
        history.push('/');
    }

    return(
        <nav>
            {props.loggedIn ?
            <div>
                <button onClick={() => history.push('/profile')} className="nav-link">Profile</button> 
                <button onClick={handleLogout} className="nav-link">Logout</button>
            </div>
            :
            <div>
                <button className="nav-link">How it works</button> 
                <button className="nav-link">About</button>
            </div>
            }
        </nav>
    );
};
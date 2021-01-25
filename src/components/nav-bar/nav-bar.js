import './nav-bar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../common/actions/auth.actions';
import Logo from '../../images/logo.png';
import CartIcon from '../../images/cart-icon.png';

export default function NavBar(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const {cartSize} = useSelector(state => state.cart);

    const handleLogout = () => {
        dispatch(logOut());
        history.push('/');
    };

    return(
        <nav>
            {props.loggedIn ?
            <div className="nav-bar-container">
                {cartSize > 0 && <p className="label-white">{cartSize}</p>}
                <img src={CartIcon} alt="Cart icon" onClick={() => history.push('/cart')}/>
                <button onClick={() => history.push('/cart')} className="nav-bar-link">Cart</button>
                <button onClick={() => history.push('/profile')} className="nav-bar-link">Profile</button> 
                <button onClick={handleLogout} className="nav-bar-link">Logout</button>
            </div>
            :
            <div className="nav-bar-container">
                <button className="nav-bar-link">How it works</button> 
                <button className="nav-bar-link">About</button>
            </div>
            }
            <img src={Logo} alt="logo" className="nav-bar-logo"/>
        </nav>
    );
};
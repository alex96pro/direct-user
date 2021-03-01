import './nav-bar.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../common/actions/auth.actions';
import Logo from '../../images/logo.png';
import CartIcon from '../../images/cart-icon.png';

export default function NavBar(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const {cartSize} = useSelector(state => state.cart);
    const [dropDown, setDropDown] = useState(false);

    const handleLogout = () => {
        setTimeout(() => dispatch(logOut()), 1000); // logout has to be the last action that sets the store to initial values
        window.scroll(0,0);
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('USER_ID');
        history.push('/');
    };

    return(
        <nav>
            {props.loggedIn ?
            <div className="nav-container">
                <div className="nav-cart-container">
                    <img src={CartIcon} alt="Loading..." className="nav-cart-icon" onClick={() => history.push('/cart')}/>
                    {cartSize > 0 && <p className={cartSize > 9 ? "nav-cart-size cart-double-digit" : "nav-cart-size"} onClick={() => history.push('/cart')}>{cartSize}</p>}
                </div>
                <i className="fas fa-bars fa-3x" onClick={() => setDropDown(!dropDown)}></i>
                {dropDown &&
                <React.Fragment>
                <div className="drop-down-underlay" onClick={() => setDropDown(false)}> </div>
                <div className="drop-down">
                    <div className="drop-down-item" onClick={() => history.push('/profile')}>Profile</div>
                    <div className="drop-down-item" onClick={handleLogout}>Log out</div>
                </div>
                </React.Fragment>
                }
            </div>
            :
            <div className="nav-container">
                <button onClick={() => history.push('/login')} className="nav-link">Log in</button>
                <button onClick={() => history.push('/sign-up')} className="nav-link">Sign up</button>
            </div>
            }
            <img src={Logo} onClick={() => props.loggedIn && history.push('/feed')} alt="logo" className="nav-logo"/>
        </nav>
    );
};
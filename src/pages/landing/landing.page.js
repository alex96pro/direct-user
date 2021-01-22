import './landing.page.scss';
import { useHistory } from 'react-router-dom';
import { PUNCHLINES } from '../../util/consts';
import { useState, useEffect, useRef } from 'react';
import NavBar from '../../components/nav-bar/nav-bar';
import GoogleStore from '../../images/google-store-icon.png';
import AppleStore from '../../images/apple-store-icon.png';

export default function Landing() {

    const history = useHistory();
    const [currentPunchline, setCurrentPunchline] = useState(0);
    const currentPunchlineRef = useRef(currentPunchline);

    const setCurrentPunchlineRef = data => {
        currentPunchlineRef.current = data;
        setCurrentPunchline(data);
    };

    const changePunchline = () => {
        if(currentPunchlineRef.current === PUNCHLINES.length - 1){
            setCurrentPunchlineRef(0);
        }else{
            setCurrentPunchlineRef(currentPunchlineRef.current + 1);
        }
        let element = document.getElementById('landing-punchline');
        element.style.opacity = 1;
        setTimeout(() => {
            let element = document.getElementById('landing-punchline');
            if(element){
                element.style.opacity = 0;
            }
        }, 3000);
    };

    useEffect(() => {
        changePunchline(); // show first (index 1) punchline so there is no empty punchline at the beggining for 3,5s
        let handle = setInterval(changePunchline, 3500);
        return () => {
            clearInterval(handle);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="landing">
            <div className="landing-first-page">
                <NavBar loggedIn={false}/>
                <div className="landing-box">
                    <div className="landing-heading">Welcome to Daily Specials !</div>
                    <div className="landing-heading">Ideal place for your hunger</div>
                    <div className="landing-punchline" id="landing-punchline">
                        {PUNCHLINES[currentPunchline]}
                    </div>
                    <button onClick={() => history.push('/login')} className="button-landing">Log In</button>
                    <button onClick={() => history.push('/sign-up')} className="button-landing">Sign up</button>
                </div>
                <div className="landing-get-apps">
                    <img src={GoogleStore} alt="google-store" className="get-app-icon"/>
                    <img src={AppleStore} alt="apple-store" className="get-app-icon"/>
                </div>
            </div>
            <div className="landing-second-page">
                <div className="restaurant-landing-box">
                    <button type="button" onClick={() => history.push('/sign-up-restaurant')} className="button-landing-restaurant">Register your restaurant</button>
                    <button type="button" onClick={() => history.push('/login-restaurant')} className="button-landing-restaurant">Log In to your restaurant</button>
                </div>
            </div>
        </div>
    );
};
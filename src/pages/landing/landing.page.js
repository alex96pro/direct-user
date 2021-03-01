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
        let element = document.getElementById('landing-1-punchline');
        element.style.opacity = 1;
        setTimeout(() => {
            let element = document.getElementById('landing-1-punchline');
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
            <div className="landing-1">
                <NavBar loggedIn={false}/>
                <div className="landing-1-container">
                    {/* <div className="landing-1-heading">Welcome to Foozard!</div>
                    <div className="landing-1-heading">Ideal place for your hunger</div> */}
                    <div className="landing-1-punchline" id="landing-1-punchline">
                        {PUNCHLINES[currentPunchline]}
                    </div>
                    <div className="landing-label">Where are you, you hungry human?</div>
                    <input type="text" className="landing-input" placeholder="Delivery address"></input>
                    {/* <button onClick={() => history.push('/login')} className="landing-1-button">Log In</button>
                    <button onClick={() => history.push('/sign-up')} className="landing-1-button">Sign up</button> */}
                </div>
                <div className="landing-1-get-apps">
                <img src={GoogleStore} alt="google-store" className="get-app-icon"/>
                <img src={AppleStore} alt="apple-store" className="get-app-icon"/>
            </div>
            </div>
            <div className="landing-2">
                <div className="landing-2-container">
                    <a href="https://direct-restaurant-dev.herokuapp.com/sign-up" className="landing-2-button">Register your restaurant</a>
                    <a href="https://direct-restaurant-dev.herokuapp.com/login" className="landing-2-button">Log In to your restaurant</a>
                </div>
            </div>
            
        </div>
    );
};
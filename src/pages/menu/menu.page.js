import './menu.page.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'; 
import { getMealsFromMenuAPI } from '../../common/api/menu.api';
import { clearMenu } from '../../common/actions/menu.actions';
import { CURRENCY } from '../../util/consts';
import Loader from '../../components/loader';
import NavBar from '../../components/nav-bar/nav-bar';
import MealsMenu from '../../components/meals-menu/meals-menu';

export default function Menu() {

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const {meals, restaurant, loadingStatus, message} = useSelector((state => state.menu));
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showCategoriesForMobile, setShowCategoriesForMobile] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem('ACCESS_TOKEN')){
            history.push('/login');
            return;
        }
        dispatch(getMealsFromMenuAPI(params.id));
        return () => {
            dispatch(clearMenu());
        }
    }, [dispatch, history, params.id]);

    const addCategory = (event) => {
        if(event.target.checked){
            setSelectedCategories([...selectedCategories, event.target.value]);
        }else{
            let newCategories = selectedCategories.filter(category => category !== event.target.value);
            setSelectedCategories(newCategories);
        }
    }

    const showOrHideCategoriesForMobile = () => {
        let categories = document.getElementsByClassName('menu-info')[0];
        if(categories){
            if(showCategoriesForMobile){
                categories.style.visibility = "hidden";
                categories.style.top = '100vh';
            }else{
                categories.style.visibility = "visible";
                categories.style.top = '0';
            }
        }
        setShowCategoriesForMobile(!showCategoriesForMobile);
    };

    return(
        <div className="menu">
            <NavBar loggedIn={true}/>
            {loadingStatus ? <Loader className="loader-center"/>
            :
            <div className="menu-container">
                <div className="menu-header-mobile">{restaurant.restaurantName}'s Menu
                    {restaurant.closed && <div className="menu-restaurant-closed">Restaurant closed</div>}
                </div>
                <div className="menu-info">
                    {meals.length > 0 && 
                    <div className="menu-header">
                        {restaurant.logo && <img src={restaurant.logo} alt="Loading..." className="menu-restaurant-logo"/>}
                        {restaurant.closed && <div className="menu-restaurant-closed">Closed</div>}
                        <div className="menu-restaurant-name">{restaurant.restaurantName}'s menu</div>
                        {restaurant["working-hours-from"] && 
                        <div className="menu-restaurant-info">Working hours {restaurant["working-hours-from"]}-{restaurant["working-hours-to"]}</div>}
                        {restaurant.delivery ? <div className="menu-restaurant-info">Delivery minimum {restaurant.deliveryMinimum}{CURRENCY}</div>
                        :
                        <React.Fragment>
                            <div className="menu-restaurant-info">Phone: {restaurant.phone}</div>
                            <div className="menu-restaurant-info">Location: {restaurant.location}</div>
                        </React.Fragment>
                        }
                    <div className="menu-category-header">Categories</div>
                    {restaurant.categories.map((category, index) => <div key={index}>
                        <label className="menu-category" htmlFor={`category${index}`}>
                            <input type="checkbox" value={category} onChange={addCategory} id={`category${index}`}/>{category}
                        </label>
                    </div>)}
                    </div>}
                </div>
                <MealsMenu meals={meals} categories={selectedCategories.length ? selectedCategories : restaurant.categories}/>
                {message && <div className="menu-message-no-meals">{message}</div>}
                <button onClick={showOrHideCategoriesForMobile} className="menu-footer-mobile">
                    {showCategoriesForMobile ? 'Close' : 'Categories'}
                </button>
            </div>
            }
            
        </div>
    );
}
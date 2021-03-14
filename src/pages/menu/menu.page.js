import './menu.page.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { getMealsFromMenuAPI } from '../../common/api/menu.api';
import { clearMenu } from '../../common/actions/menu.actions';
import { CURRENCY } from '../../util/consts';
import { Checkbox } from 'antd';
import Loader from '../../components/loader';
import NavBar from '../../components/nav-bar/nav-bar';
import MealsMenu from '../../components/meals-menu/meals-menu';

export default function Menu() {

    const dispatch = useDispatch();
    const params = useParams();
    const {meals, restaurant, message} = useSelector((state => state.menu));
    const loadingStatusMenu = useSelector(state => state.menu.loadingStatus);
    const loadingStatusModifiers = useSelector(state => state.modifiers.loadingStatus);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showCategoriesForMobile, setShowCategoriesForMobile] = useState(false);

    useEffect(() => {
        dispatch(getMealsFromMenuAPI(params.id));
        return () => {
            dispatch(clearMenu());
        }
    }, [dispatch, params.id]);

    const addCategory = (event, category) => {
        if(event.target.checked){
            setSelectedCategories([...selectedCategories, category]);
        }else{
            let newCategories = selectedCategories.filter(categoryItem => categoryItem !== category);
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
            {loadingStatusMenu ? <Loader className="loader-center"/>
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
                            <Checkbox onChange={(event) => addCategory(event, category)} id={`category${index}`}/>{category}
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
            {loadingStatusModifiers && <Loader className="loader-center" blackBackground/>}
        </div>
    );
}
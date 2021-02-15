import './menu.page.scss';
import NavBar from '../../components/nav-bar/nav-bar';
import MealsMenu from '../../components/meals-menu/meals-menu';
import Loader from '../../components/common/loader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getMealsFromMenuAPI } from '../../common/api/menu.api';
import { clearMenu } from '../../common/actions/menu.actions';
import { CURRENCY } from '../../util/consts';

export default function Menu() {

    const dispatch = useDispatch();
    const params = useParams();
    const {meals, restaurant, loadingStatus, message} = useSelector((state => state.menu));
    const [selectedCategories, setSelectedCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        dispatch(getMealsFromMenuAPI(params.id));
        return () => {
            dispatch(clearMenu());
        }
    }, [dispatch, params.id]);

    const addCategory = (event) => {
        if(event.target.checked){
            setSelectedCategories([...selectedCategories, event.target.value]);
        }else{
            let newCategories = selectedCategories.filter(category => category !== event.target.value);
            setSelectedCategories(newCategories);
        }
    }

    return(
        <div className="menu">
            <NavBar loggedIn={true}/>
            {loadingStatus ? <Loader/>
            :
            <div className="menu-container">
                <div className="menu-categories">
                    {meals.length > 0 && 
                    <div className="menu-header">
                        {restaurant.logo && <img src={restaurant.logo} alt="Loading..." className="menu-restaurant-logo"/>}
                        <div className="menu-restaurant-name">{restaurant.restaurantName}'s menu</div>
                        {restaurant.delivery ? <div className="menu-restaurant-info">Delivery minimum {restaurant.deliveryMinimum}{CURRENCY}</div>
                        :
                        <div className="menu-restaurant-info">Phone: {restaurant.phone}
                        <div className="menu-restaurant-info">Location: {restaurant.location}</div>
                        </div>
                    }
                    </div>}
                    <div className="menu-category-header">Categories</div>
                    {restaurant.categories.map((category, index) => <div key={index}>
                        <div className="menu-category"><input type="checkbox" value={category} onChange={addCategory}/>{category}</div>
                    </div>)}
                    <button onClick={() => history.go(-1)} className="button-normal">Back</button>
                </div>
                <MealsMenu meals={meals} categories={selectedCategories.length ? selectedCategories : restaurant.categories}/>
            </div>
            }
            {message && <div className="header-accent-color">{message}</div>}
        </div>
    );
}
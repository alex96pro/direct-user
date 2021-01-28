import './menu.page.scss';
import NavBar from '../../components/nav-bar/nav-bar';
import MealsMenu from '../../components/meals-menu/meals-menu';
import Loader from '../../components/common/loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getMealsFromMenuAPI } from '../../common/api/menu.api';
import { clearMenu } from '../../common/actions/menu.actions';
import { CURRENCY } from '../../util/consts';

export default function Menu() {

    const dispatch = useDispatch();
    const params = useParams();
    const {meals, restaurant, loadingStatus, message} = useSelector((state => state.menu));
    const history = useHistory();

    useEffect(() => {
        dispatch(getMealsFromMenuAPI(params.id));
        return () => {
            dispatch(clearMenu());
        }
    }, [dispatch, params.id]);

    return(
        <div className="menu">
            <NavBar loggedIn={true}/>
            {loadingStatus ? <Loader/>
            :
            <div className="menu-container">
                <div className="menu-categories">
                    {meals.length > 0 && 
                    <div className="menu-header">
                        <div className="menu-restaurant-name">{restaurant.restaurantName}'s menu</div>
                        {restaurant.delivery ? <div className="menu-restaurant-info">Delivery minimum {restaurant.deliveryMinimum}{CURRENCY}</div>
                        :
                        <div className="menu-restaurant-info">Phone: {restaurant.phone}
                        <div className="menu-restaurant-info">Location: {restaurant.location}</div>
                        </div>
                    }
                    </div>}
                    <div className="menu-category-header">Categories</div>
                    {restaurant.categories.map((category, index) => <div>
                        <div className="menu-category" key={index}><input type="checkbox"/>{category}</div>
                    </div>)}
                    <button onClick={() => history.push('/feed')} className="button-normal">Back to feed</button>
                </div>
                <MealsMenu meals={meals}/>
            </div>
            }
            {message && <div className="header-accent-color">{message}</div>}
        </div>
    );
}
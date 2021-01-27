import './menu.page.scss';
import NavBar from '../../components/nav-bar/nav-bar';
import MenuMeals from '../../components/menu-meals/menu-meals';
import MealModal from '../feed/meal.modal';
import Loader from '../../components/common/loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getMealsFromMenuAPI } from '../../common/api/menu.api';
import { clearMenu } from '../../common/actions/menu.actions';
import { CURRENCY } from '../../util/consts';

export default function Menu() {

    const [modal, setModal] = useState({show:false, selectedMeal:{}});
    const dispatch = useDispatch();
    const params = useParams();
    const {meals, loadingStatus, message} = useSelector((state => state.menu));
    const history = useHistory();

    const showModal = (meal) => {
        setModal({show: true, selectedMeal: meal});
    }
    const closeModal = () => {
        setModal({...modal, show:false});
    }

    useEffect(() => {
        dispatch(getMealsFromMenuAPI(params.id));
        return () => {
            dispatch(clearMenu());
        }
    }, [dispatch, params.id]);

    return(
        <div className="menu">
            <NavBar loggedIn={true}/>
            {meals.length > 0 && 
            <div className="menu-header">
                <div className="header-accent-color">{meals[0].restaurantName}'s menu</div>
                {meals[0].delivery && <div className="menu-delivery-minimum">Delivery minimum {meals[0]["delivery-minimum"]}{CURRENCY}</div>}
            </div>}
            <div className="menu-container">
                <div className="menu-categories">
                    <div className="menu-category-header">Categories</div>
                    <div className="menu-category"><input type="checkbox"/>Burgers</div>
                    <div className="menu-category"><input type="checkbox"/>Hot Dogs</div>
                    <div className="menu-category"><input type="checkbox"/>Ribs</div>
                    <div className="menu-category"><input type="checkbox"/>Pancakes</div>
                </div>
                {loadingStatus ? <Loader/>
                :
                <MenuMeals meals={meals} showModal={showModal}/>
                }
            </div>
            {message && <div className="header-accent-color">{message}</div>}
            {modal.show && <MealModal closeModal={closeModal} meal={modal.selectedMeal}/>}
            {!loadingStatus && <button onClick={() => history.push('/feed')} className="button-normal">Back to feed</button>}
        </div>
    );
}
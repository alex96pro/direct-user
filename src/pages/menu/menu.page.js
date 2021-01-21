import './menu.page.scss';
import NavBar from '../../components/nav-bar/nav-bar';
import Meals from '../../components/meals/meals.component';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealModal from '../feed/meal.modal';
import Loader from '../../components/common/loader';
import { useHistory, useParams } from 'react-router-dom';
import { getMealsFromMenuAPI } from '../../common/api/menu.api';
import { clearMenu } from '../../common/actions/menu.actions';
import { CURRENCY } from '../../util/consts';

export default function Menu() {

    const [modal, setModal] = useState({show:false, selectedMeal:{}});
    const dispatch = useDispatch();
    const params = useParams();
    const {meals, loadingStatus} = useSelector((state => state.menu));
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
                <div className="header-white">{meals[0].restaurantName}'s menu</div>
                {meals[0].delivery && <div className="menu-delivery-minimum">Delivery minimum {meals[0]["delivery-minimum"]}{CURRENCY}</div>}
            </div>}
            <div className="meals-menu">
                {loadingStatus ? <Loader/>
                :
                <Meals meals={meals} showModal={showModal}/>
                }
            </div>
            {modal.show && <MealModal closeModal={closeModal} meal={modal.selectedMeal}/>}
            {!loadingStatus && <button onClick={() => history.push('/feed')} className="button-normal">Back to feed</button>}
        </div>
    );
}
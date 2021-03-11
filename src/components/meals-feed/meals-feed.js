import './meals-feed.scss';
import { useHistory } from 'react-router-dom';
import { CURRENCY, DISTANCE } from '../../util/consts';
import React, { useState } from 'react';
import { errorToast } from '../../util/toasts/toasts';
import { getSpecialModifiersAPI } from '../../common/api/modifiers.api';
import { useDispatch, useSelector } from 'react-redux';
import MealModal from '../../components/meal-modal/meal.modal';
import Loader from '../../components/loader';


export default function MealsFeed(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [modal, setModal] = useState({show: false, selectedMeal:{}});
    const {loadingStatus} = useSelector(state => state.modifiers);

    const showModal = (meal) => {
        if(!meal.closed){
            dispatch(getSpecialModifiersAPI(meal.specialId, () =>  setModal({show: true, selectedMeal: meal})));
        }else{
            errorToast(`Restaurant ${meal.restaurantName} is closed`);
        }
    };

    const closeModal = () => {
        setModal({show: false, selectedMeal: {}});
    };

    return (
        <React.Fragment>
        {props.meals.map((meal, index) => 
            <div className="meal" key={meal.specialId}>
                <div className="meal-left-container">
                    <img src={meal.photo} alt="meal" className="meal-photo" onClick={() => showModal(meal)}/>
                    {meal.closed && 
                <React.Fragment>
                     <div className="meal-photo-darkened" onClick={() => showModal(meal)}></div>
                     <label className="meal-closed-label">Closed</label>
                </React.Fragment>}
                </div>
                
                <div className="meal-right-container">
                    <div className="meal-header" onClick={() => showModal(meal)}>
                        <div className="meal-name">{meal.mealName}</div>
                        <div className="meal-price">{meal.price}{CURRENCY}</div>
                    </div>
                    <div>
                        <div className="meal-restaurant-name" onClick={() => history.push(`/menu/${meal.restaurantId}`)}>{meal.restaurantName}</div>
                        <div className="meal-tags">
                        {meal.tags.map((tag, tagIndex) => 
                            <div className="meal-tag" key={tagIndex}>#{tag}</div>
                        )}
                        </div>
                        {meal.delivery ? 
                            <div className="meal-restaurant-info">
                                <div className="meal-delivery-label">Delivery minimum </div>
                                <div className="meal-delivery-minimum">{meal["delivery-minimum"]}{CURRENCY}</div>
                            </div>
                            :
                            <div className="meal-restaurant-info">
                                <div className="meal-delivery-label">Pickup only</div>
                                {meal.distance && <div className="meal-delivery-minimum">{meal.distance.toFixed(2)}{DISTANCE}</div>}
                            </div>
                        }
                        <div className="meal-restaurant-info">
                            {meal["working-hours-from"] &&
                            <React.Fragment>
                                <div className="meal-working-hours-label">Working hours {' '}</div>
                                <div className="meal-working-hours">
                                    {meal["working-hours-from"]}-{meal["working-hours-to"]}
                                </div>
                            </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>)}
            {modal.show && <MealModal meal={modal.selectedMeal} closeModal={closeModal} feed={true}/>}
            {loadingStatus && <Loader className="loader-center"/>}
        </React.Fragment>
    );
}
import './meals-menu.scss';
import { CURRENCY } from '../../util/consts';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MealModal from '../meal-modal/meal.modal';
import { errorToast } from '../../util/toasts/toasts';

export default function MealsMenu(props) {

    const [showMealModal, setShowMealModal] = useState({show:false, selectedMeal:{}});
    const { restaurant } = useSelector(state => state.menu);

    const filteredMeals = props.meals.filter(meal => 
        props.categories.includes(meal.category)
    );

    const handleShowMealModal = (meal) => {
        if(!restaurant.closed){
            setShowMealModal({show: true, selectedMeal: meal});
        }else{
            errorToast(`Restaurant ${restaurant.restaurantName} is closed`);
        }
        
    };

    const closeModal = () => {
        setShowMealModal({show: false, selectedMeal: {}});
    };

    const showHiddenDiv = (index) => {
        document.getElementsByClassName('menu-meals-hidden-description')[index].style.opacity = 1;
    };
    const hideHiddenDiv = (index) => {
        document.getElementsByClassName('menu-meals-hidden-description')[index].style.opacity = 0;
    };

    return (
        <div className="menu-meals">
            {filteredMeals.map((meal, index) => <div className="menu-meals-meal" key={meal.mealId} onClick={() => handleShowMealModal(meal)}>
                <div className="menu-meals-meal-header">
                    <div className="menu-meals-meal-name">{meal.mealName}</div>
                    <div className="menu-meals-meal-price">{meal.price}{CURRENCY}</div>
                </div>
                <img src={meal.photo} className="menu-meals-meal-photo" alt="meal-menu"/>
                <div className="menu-meals-hidden-description"
                    onMouseEnter={() => showHiddenDiv(index)}
                    onMouseLeave={() => hideHiddenDiv(index)}>
                    <div className="menu-meals-description">{meal.description}</div>
                </div>
            </div>)}
            {showMealModal.show && <MealModal restaurant={restaurant} meal={showMealModal.selectedMeal} closeModal={closeModal} detailedInfo={false}/>}
        </div>
    );
}
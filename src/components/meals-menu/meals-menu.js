import './meals-menu.scss';
import { CURRENCY } from '../../util/consts';
import { useState } from 'react';
import MealModal from '../meal-modal/meal.modal';
import { useSelector } from 'react-redux';

export default function MealsMenu(props) {

    const [showMealModal, setShowMealModal] = useState({show:false, selectedMeal:{}});
    const { restaurant } = useSelector(state => state.menu);

    const handleShowMealModal = (meal) => {
        setShowMealModal({show: true, selectedMeal: meal});
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
            {props.meals.map((meal, index) => <div className="menu-meals-meal" key={index} onClick={() => handleShowMealModal(meal)}>
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
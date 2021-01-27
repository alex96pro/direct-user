import './meals.component.scss';
import { useHistory } from 'react-router-dom';
import { CURRENCY, DISTANCE } from '../../util/consts';
import React from 'react';

export default function Meals(props) {

    const history = useHistory();

    const changeColor = (index, color) => {
        let element = document.getElementsByClassName('meal')[index];
        if(element){
            color ? element.style.backgroundColor = '#d8d8d8' : element.style.backgroundColor = '#e7e7e7';
        }
    };

    return (
        <React.Fragment>
        {props.meals.map((meal, index) => 
            <div className="meal" key={index}>
                <div className="meal-header" onClick={() => props.showModal(meal)} 
                    onMouseEnter={() => changeColor(index, 1)} onMouseLeave={() => changeColor(index, 0)}>
                    <div className="meal-name">{meal.mealName}</div>
                    <div className="meal-price">{meal.price}{CURRENCY}</div>
                </div>
                <img src={meal.photo} alt="meal" className="meal-photo" onClick={() => props.showModal(meal)}
                onMouseEnter={() => changeColor(index, 1)} onMouseLeave={() => changeColor(index, 0)}/>
                
                <div>
                    <div className="meal-restaurant-name" onClick={() => history.push(`/menu/${meal.restaurantId}`)}>{meal.restaurantName}</div>
                    <div className="meal-see-menu" onClick={() => history.push(`/menu/${meal.restaurantId}`)}>See menu</div>
                    {meal.delivery ? 
                        <div className="meal-delivery-tags">
                            <div className="meal-delivery-tag-minimum"><label className="meal-delivery-tag">Delivery minimum </label>{meal["delivery-minimum"]}{CURRENCY}</div>
                        </div>
                        :
                        <div className="meal-delivery-tags">
                            <div className="meal-delivery-tag">Pickup only</div>
                            {meal.distance && <div className="meal-delivery-tag">Distance {meal.distance.toFixed(2)}{DISTANCE}</div>}
                        </div>
                    }
                </div>
                <div className="meal-tags" onClick={() => props.showModal(meal)}>
                    {meal.tags.map((tag, tagIndex) => 
                        <div className="meal-tag" key={tagIndex}>#{tag}</div>
                    )}
                </div>
            </div>)}
        </React.Fragment>
    );
}
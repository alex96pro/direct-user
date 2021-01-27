import './menu-meals.scss';
import { CURRENCY } from '../../util/consts';
import React from 'react';

export default function MenuMeals(props) {

    return (
        <div className="menu-meals">
            {props.meals.map((meal, index) => <div className="menu-meals-meal">
                <div className="menu-meals-meal-header">
                    <div className="menu-meals-meal-name">{meal.mealName}</div>
                    <div className="menu-meals-meal-price">{meal.price}{CURRENCY}</div>
                </div>
                <img src={meal.photo} className="menu-meals-meal-photo" alt="meal-menu"/>
            </div>)}
        </div>
    );
}
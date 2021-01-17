import { useState, useEffect } from 'react';
import { DISTANCE } from '../../util/consts';

export default function MealModal(props) {
    
    const [modalOpacity, setModalOpacity] = useState(0);

    useEffect(() => {
        setModalOpacity(1);
    }, []);


    return (
        <div className="forgotten-password-modal">
            <div className="modal-overlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container" style={{opacity:modalOpacity}}>
                <div className="modal-x-container">
                    <button onClick={() => props.closeModal()} className="modal-x">x</button>
                </div>
                <div className="label-accent-color">
                    Meal: {props.meal.mealName}
                </div>
                <div className="label-accent-color">
                    Restaurant: {props.meal.restaurantName}
                </div>
                <div className="label-accent-color">
                    Location: {props.meal.location}
                </div>
                <div className="label-accent-color">
                    Distance: {props.meal.distance.toFixed(2)}{DISTANCE}
                </div>
            </div>
        </div>
    );
};
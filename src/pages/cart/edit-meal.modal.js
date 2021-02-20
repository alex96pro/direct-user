import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeAmount } from '../../common/actions/cart.actions';

export default function EditMealModal(props) {

    const [modalOpacity, setModalOpacity] = useState(0);
    const dispatch = useDispatch();

    const incrementOrDecrementAmount = (index, type) => {
        dispatch(changeAmount({index: index, type: type}));
    };

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    return (
        <div className="modal">
            <div className="modal-underlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container" style={{opacity:modalOpacity}}>
                <div className="modal-header">
                    <button onClick={() => props.closeModal()} className="modal-x">x</button>
                </div>
                <div className="modal-body">
                    {props.meal.notes && <div className="label-accent-color">Notes: <textarea defaultValue={props.meal.notes}/></div>}
                    <i className="fas fa-minus fa-2x" onClick={() => incrementOrDecrementAmount(props.meal.index, "DECREMENT")}></i>
                    <i className="fas fa-plus fa-2x" onClick={() => incrementOrDecrementAmount(props.meal.index, "INCREMENT")}></i>
                </div>
            </div>
        </div>
    );
}
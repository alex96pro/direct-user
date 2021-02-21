import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../common/actions/cart.actions';
import { infoToast } from '../../util/toasts/toasts';

export default function RemoveMealModal(props) {

    const [modalOpacity, setModalOpacity] = useState(0);
    const dispatch = useDispatch();

    const removeMealFromCart = () => {
        dispatch(removeFromCart(props.meal.index));
        props.closeModal();
        infoToast("Removed from cart");
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
                    <label className="label-accent-color">
                        Are you sure you want to remove {props.meal.mealName} from your cart?
                    </label>
                    <button onClick={removeMealFromCart} className="button-long">Remove</button>
                </div>
            </div>
        </div>
    );
}
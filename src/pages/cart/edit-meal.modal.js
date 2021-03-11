import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editCartMeal } from '../../common/actions/cart.actions';
import { infoToast } from '../../util/toasts/toasts';
import { CURRENCY } from '../../util/consts';
import { calculateMealPrice } from '../../util/functions';
import Modifiers from './cart-meal.modifiers';
import InputError from '../../components/input-error';

export default function MealModal(props) {
    
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(props.meal.amount);
    const [selectedModifiers, setSelectedModifiers] = useState(props.meal.selectedModifiers);

    const handleEditMeal = (data) => {
        dispatch(editCartMeal({
            amount: data.amount,
            notes: data.notes,
            price: calculateMealPrice(selectedModifiers, +amount),
            selectedModifiers: selectedModifiers,
            index: props.index
        }));
        props.closeModal();
        infoToast('Successfully edited');
    };

    const changeAmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input){
            setAmount(+input.value);
        }
    };

    const incrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input){
            input.value = +input.value + 1;
            setAmount(+amount + 1);
        }
    };

    const decrementAmmount = () => {
        const input = document.getElementsByName('amount')[0];
        if(input && input.value > 1){
            input.value = input.value - 1;
            setAmount(amount - 1);
        }
    };

    const addRequiredBaseModifier = (modifier, optionName, optionPrice) => {
        setSelectedModifiers({...selectedModifiers, requiredBaseModifier: {modifierId: modifier.modifierId, modifierName: modifier.modifier.name, optionName: optionName, optionPrice: +optionPrice}});
    };

    const addRequiredModifier = (modifier, optionName, optionPrice) => {
        let newRequiredModifiers = selectedModifiers.requiredModifiers.filter(item => item.modifierId !== modifier.modifierId);
        newRequiredModifiers.push({modifierId: modifier.modifierId, modifierName:modifier.modifier.name, optionName: optionName, optionPrice: optionPrice});
        setSelectedModifiers({...selectedModifiers, requiredModifiers: newRequiredModifiers});
    };

    const addOptionalModifier = (event, modifier, optionName, optionPrice) => {
        if(event.target.checked){ // add
            setSelectedModifiers({...selectedModifiers, optionalModifiers: [...selectedModifiers.optionalModifiers, {modifierId:modifier.modifierId, modifierName:modifier.modifier.name, optionName:optionName, optionPrice:optionPrice}]});
        }else{ // remove
            setSelectedModifiers({...selectedModifiers, optionalModifiers: selectedModifiers.optionalModifiers.filter(item => (item.optionName !== optionName && item.modifierId === modifier.modifierId))});
        }
    };

    return (
        <React.Fragment>
        <div className="modal-underlay" onClick={() => props.closeModal()}></div>
        <div className="modal" style={{opacity:1}}>
        <form onSubmit={handleSubmit(handleEditMeal)}>
            <div className="modal-header">
                <i className="fas fa-times fa-2x" onClick={() => props.closeModal()}></i>
            </div>
            <div className="modal-body-horizontal">
                <div className="meal-modal-photo-container">
                    <img src={props.meal.photo} alt="Loading..." className="meal-modal-photo"/>
                </div>
                <div className="meal-modal-basic-info">
                    <div className="label-accent-color">{props.meal.mealName}</div>
                    <div className="label pt-15">{props.meal.description}</div>
                    <div className="label pt-15">Amount</div>
                    <div className="meal-modal-amount-row">
                        <input type="number" name="amount" defaultValue={props.meal.amount} ref={register({required:true, min:1})} onChange={changeAmount} className="app-input-number"/>
                        <i className="fas fa-minus fa-2x" onClick={decrementAmmount}></i>
                        <i className="fas fa-plus fa-2x" onClick={incrementAmmount}></i>
                        {errors.amount && <InputError text={'Amount is required'}/>}
                    </div>
                    <div className="label pt-15">Notes (optional)</div>
                    <textarea name="notes" ref={register({maxLength: 200})} defaultValue={props.meal.notes} className="app-textarea"/>
                    {errors.notes && <InputError text={'Notes are limited to 200 characters'}/>}
                </div>
                <Modifiers modifiers={props.meal.modifiers} selectedModifiers={props.meal.selectedModifiers} addOptionalModifier={addOptionalModifier} addRequiredModifier={addRequiredModifier} addRequiredBaseModifier={addRequiredBaseModifier}/>
            </div>
            <div className="modal-footer">
                <button type="submit" className="button-long button-add-to-cart">
                    {calculateMealPrice(selectedModifiers, +amount) + CURRENCY} &nbsp;&nbsp; Save changes
                </button>
            </div>
            </form>
        </div>
        </React.Fragment>
    );
};
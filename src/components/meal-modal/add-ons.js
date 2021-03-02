import './add-ons.scss';
import React, { useState, useEffect } from 'react';
import { CURRENCY } from '../../util/consts';

export default function AddOnsModal(props) {
    
    const [modalOpacity, setModalOpacity] = useState(0);

    useEffect(() => {
        setModalOpacity(1);
    }, []);


    return (
        <div className="add-ons">
            {Object.keys(props.addOns.values).map(key =>
            <div className="add-ons-container">
            <input type="checkbox" value={props.addOns.values[key]} onChange={props.addAddOn}/>
            <label value={key} key={key} className="add-on-label">
                {key} {props.addOns.values[key] === 0 ? '' :
                '+'+props.addOns.values[key] + CURRENCY}
            </label>
            </div>)}
        </div>
    );
};
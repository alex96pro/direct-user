import './modifiers.scss';
// import { CURRENCY } from '../../util/consts';
import React from 'react';

export default function Modifiers(props) {

    return (
        <div className="modifiers">
            {/* <div className="modifiers-container">
            {props.modifiers.map((modifier,index) => modifier.modifier.required && 
            <div key={index}>
                <div className="label-accent-color-2">Choose {modifier.modifier.name}</div>
                    {Object.keys(modifier.modifier.values).map(key =>
                    <div key={key} className="flex-row">
                        <input value={key} key={key} type="radio"/>
                        <div className="label">{key}
                            {modifier.modifier.values[key] ? ' '+modifier.modifier.values[key] + CURRENCY : ''}
                        </div>
                    </div>)} 
            </div>)}
            </div>
            <div className="modifiers-container">
            {props.modifiers.map((modifier,index) => !modifier.modifier.required && <div key={index}>
                <div className="label-accent-color-2">Add ons</div>
                <div>
                    {Object.keys(modifier.modifier.values).map(key =>
                        <div className="flex-row" key={key}>
                            <input type="checkbox" value={modifier.modifier.values[key]} onChange={props.addAddOn}/>
                            <div value={key} className="label">
                                {key} {modifier.modifier.values[key] ? '+'+modifier.modifier.values[key] + CURRENCY : ''}
                            </div>
                        </div>)}
                </div>
            </div>)}
            </div> */}
        </div>
    );
};
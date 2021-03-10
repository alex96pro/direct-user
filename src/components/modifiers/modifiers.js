import './modifiers.scss';
import { CURRENCY } from '../../util/consts';
import { useSelector } from 'react-redux';
import { Checkbox } from 'antd';
// import React, { useState } from 'react';

export default function Modifiers(props) {

    const { modifiers } = useSelector(state => state.modifiers);

    return (
        <div className="modifiers">
                {modifiers.map(modifier => modifier.modifier.modifierType === "requiredBase" && 
                <div key={modifier.modifierId} className="modifiers-container">
                    <div className="label-accent-color-2">Choose {modifier.modifier.name}</div>
                        {Object.keys(modifier.modifier.options).map(key =>
                        <div key={key} className="flex-row">
                            <input type="radio" name="requiredBase" onChange={() => props.addRequiredBaseModifier(modifier, modifier.modifier.options[key])} defaultChecked={key === modifier.modifier.defaultOption}/>
                            <label className="label">{key}
                                {modifier.modifier.options[key] ? ' '+modifier.modifier.options[key] + CURRENCY : ''}
                            </label>
                        </div>)} 
                </div>)}
                {modifiers.map(modifier => modifier.modifier.modifierType === "required" && 
                <div key={modifier.modifierId} className="modifiers-container">
                    <div className="label-accent-color-2">Choose {modifier.modifier.name}</div>
                        {Object.keys(modifier.modifier.options).map(key =>
                        <div key={key} className="flex-row">
                            <input type="radio" name={"requiredBase"+modifier.modifierId} onChange={() => props.addRequiredModifier(modifier, modifier.modifier.options[key])} defaultChecked={key === modifier.modifier.defaultOption}/>
                            <div className="label">{key}
                                {modifier.modifier.options[key] > 0 ? ' +'+modifier.modifier.options[key] + CURRENCY : ''}
                            </div>
                        </div>)} 
                </div>)}
                {modifiers.map(modifier => modifier.modifier.modifierType === "optional" && 
                <div key={modifier.modifierId} className="modifiers-container">
                    <div className="label-accent-color-2">Choose {modifier.modifier.name} (max {modifier.modifier.maximum})</div>
                        {Object.keys(modifier.modifier.options).map(key =>
                        <div key={key} className="flex-row">
                            <Checkbox onChange={(event) => props.addOptionalModifier(event, modifier, modifier.modifier.options[key])} id={"optional-"+key+"-"+modifier.modifierId}/>
                            <label className="label modifier-option-label" htmlFor={"optional-"+key+"-"+modifier.modifierId}>{key}
                                {modifier.modifier.options[key] > 0 ? ' +'+modifier.modifier.options[key] + CURRENCY : ''}
                            </label>
                        </div>)}
                </div>)}
        </div>
    );
};
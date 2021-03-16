import { CURRENCY } from '../../util/consts';
import { Checkbox, Radio } from 'antd';
import React from 'react';

export default function Modifiers(props) {

    // IMPORTANT !!!
    // Radio.Group has its own class which is overriden in elements.scss

    const whichRequiredIsChecked = (modifierId) => {
        let modifiers = props.selectedModifiers.requiredModifiers;
        for(let i = 0; i < modifiers.length; i++){
            if(modifiers[i].modifierId === modifierId){
                return modifiers[i].optionName;
            }
        }
    };

    const isOptionalChecked = (modifierId, optionName) => {
        let modifiers = props.selectedModifiers.optionalModifiers;
        for(let i = 0; i < modifiers.length; i++){
            if(modifiers[i].modifierId === modifierId && modifiers[i].optionName === optionName){
                return true;
            }
        }
        return false;
    };

    return (
        <div className="modifiers">
            {props.modifiers.map(modifier => modifier.modifier.modifierType === "requiredBase" && 
            <React.Fragment key={modifier.modifierId}>
            <div className="modifier-name">Choose {modifier.modifier.name}</div>
            <div className="modifiers-container">
                <Radio.Group defaultValue={props.selectedModifiers.requiredBaseModifier.optionName}>
                    {Object.keys(modifier.modifier.options).map(key =>
                    <label key={"requiredBase"+key} htmlFor={"option-"+modifier.modifierId+"-"+key} className="modifiers-option">
                        <Radio id={"option-"+modifier.modifierId+"-"+key} value={key} onChange={() => props.addRequiredBaseModifier(modifier, key, modifier.modifier.options[key])}/>
                        <div className="modifier-option-info">
                            <div className="label">{key}</div>
                            <div className="label" style={{alignSelf:'flex-end'}}>{modifier.modifier.options[key] ? ' '+modifier.modifier.options[key] + CURRENCY : ''}</div>
                        </div>
                    </label>
                    )} 
                </Radio.Group>
            </div>
            </React.Fragment>)}
            
            {props.modifiers.map(modifier => modifier.modifier.modifierType === "required" && 
            <React.Fragment key={modifier.modifierId}>
            <div className="modifier-name">Choose {modifier.modifier.name}</div>
            <div className="modifiers-container">
                <Radio.Group defaultValue={() => whichRequiredIsChecked(modifier.modifierId)}>
                    {Object.keys(modifier.modifier.options).map(key =>
                    <label key={"required"+key} htmlFor={"option-"+modifier.modifierId+"-"+key} className="modifiers-option">
                        <Radio id={"option-"+modifier.modifierId+"-"+key} value={key} onChange={() => props.addRequiredModifier(modifier, key, modifier.modifier.options[key])}/>
                        <div className="modifier-option-info">
                            <div className="label">{key}</div>
                            <div className="label">{modifier.modifier.options[key] ? ' '+modifier.modifier.options[key] + CURRENCY : ''}</div>
                        </div>
                    </label>
                    )} 
                </Radio.Group>
            </div>
            </React.Fragment>)}

            {props.modifiers.map(modifier => modifier.modifier.modifierType === "optional" && 
            <React.Fragment key={modifier.modifierId}>
            <div className="modifier-name">Choose {modifier.modifier.name} (max {modifier.modifier.maximum})</div>
            <div className="modifiers-container">
                {Object.keys(modifier.modifier.options).map(key =>
                    <label key={"optional"+key} htmlFor={"optional-"+key+"-"+modifier.modifierId} className="modifiers-option">
                    <Checkbox defaultChecked={isOptionalChecked(modifier.modifierId, key)} onChange={(event) => props.addOptionalModifier(event, modifier, key, modifier.modifier.options[key])} id={"optional-"+key+"-"+modifier.modifierId}/>
                    <div className="modifier-option-info">
                        <div className="label">{key}</div>
                        <div className="label">{modifier.modifier.options[key] ? ' '+modifier.modifier.options[key] + CURRENCY : ''}</div>
                    </div>
                    </label>
                )}
            </div>
            </React.Fragment>)}
            
        </div>
    );
};
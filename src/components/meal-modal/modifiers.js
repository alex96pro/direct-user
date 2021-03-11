import './modifiers.scss';
import { CURRENCY } from '../../util/consts';
import { useSelector } from 'react-redux';
import { Checkbox, Radio } from 'antd';
import React from 'react';
export default function Modifiers(props) {

    const { modifiers } = useSelector(state => state.modifiers);
    // IMPORTANT !!!
    // Radio.Group has its own class which is overriden in elements.scss
    return (
        <div className="modifiers">
            {modifiers.map(modifier => modifier.modifier.modifierType === "requiredBase" && 
            <React.Fragment key={modifier.modifierId}>
            <div className="label-accent-color-2 pt-15 pl-15">Choose {modifier.modifier.name}</div>
            <div className="modifiers-container">
                <Radio.Group defaultValue={modifier.modifier.defaultOption}>
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
            
            {modifiers.map(modifier => modifier.modifier.modifierType === "required" && 
            <React.Fragment key={modifier.modifierId}>
            <div className="label-accent-color-2 pt-15 pl-15">Choose {modifier.modifier.name}</div>
            <div className="modifiers-container">
                <Radio.Group defaultValue={modifier.modifier.defaultOption}>
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

            {modifiers.map(modifier => modifier.modifier.modifierType === "optional" && 
            <React.Fragment key={modifier.modifierId}>
            <div className="label-accent-color-2 pt-15 pl-15">Choose {modifier.modifier.name} (max {modifier.modifier.maximum})</div>
            <div className="modifiers-container">
                {Object.keys(modifier.modifier.options).map(key =>
                    <label key={"optional"+key} htmlFor={"optional-"+key+"-"+modifier.modifierId} className="modifiers-option">
                    <Checkbox onChange={(event) => props.addOptionalModifier(event, modifier, key, modifier.modifier.options[key])} id={"optional-"+key+"-"+modifier.modifierId}/>
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
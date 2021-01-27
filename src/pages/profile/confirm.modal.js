import { useState, useEffect } from 'react';

export default function ConfirmModal(props) {
    
    const [modalOpacity, setModalOpacity] = useState(0);

    useEffect(() => {
        setModalOpacity(1);
    }, []);


    return (
        <div className="modal">
            <div className="modal-overlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container" style={{opacity:modalOpacity}}>
                <div className="modal-x-container">
                    <button onClick={() => props.closeModal()} className="modal-x">x</button>
                </div>
                <div className="label-accent-color">
                    {props.text}
                </div>
                <button onClick={props.confirm} className="button-normal">
                    Confirm
                </button>
                <button onClick={() => props.closeModal()} className="button-normal">Cancel</button>
            </div>
        </div>
    );
};
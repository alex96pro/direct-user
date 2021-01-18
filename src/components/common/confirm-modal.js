
import {useState, useEffect} from 'react';
export default function ConfirmModal(props) {

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
                <div className="modal-header">
                    {props.header}
                </div>
                <div className="modal-body">
                    {props.body}
                </div>
                {props.submit && 
                <div>
                    <button onClick={() => props.submit()} className="button-normal">
                        Confirm
                    </button>
                    <button onClick={() => props.closeModal()} className="button-normal">
                        Cancel
                    </button>
                </div>
                }
            </div>
        </div>
    );
}
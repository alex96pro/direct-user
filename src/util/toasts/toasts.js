import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./toasts.scss";

export function infoToast(text, time = 1800){
    return toast.info(text, {
        autoClose: time,
        pauseOnHover: false,
        containerId: "top-right"
    });
};

export function successToast(text, time = 1800){
    return toast.success(text, {
        autoClose: time,
        pauseOnHover: false,
        containerId: "top-right"
    });
};

export function errorToast(text, time = 3000){
    return toast.error(text, {
        autoClose: time,
        containerId: "top-right"
    });
}; 
     
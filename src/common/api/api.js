import axios from 'axios';

export async function get(url, isPrivate, message){
    try{
        if(isPrivate){
            let response = await axios.get(url);
            return response;
        }else{
            let response = await axios.get(url, {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            return response;
        }
        
    }catch(err){
        return err.response;
    }
};

export async function post(url, data, isPrivate, message){
    try{
        if(isPrivate){
            let response = await axios.post(url, data, {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            return response;
        }else{
            let response = await axios.post(url, data);
            return response;
        }
        
    }catch(err){
        return err.response;
    }
};

export async function put(url, data, isPrivate, message){
    try{
        if(isPrivate){
            let response = await axios.put(url, data, {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            return response;
        }else{
            let response = await axios.get(url, data);
            return response;
        }
    }catch(err){
        return err.response;
    }
};

export async function deleteRequest(url, isPrivate, message){
    try{
        if(isPrivate){
            let response = await axios.delete(url, {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            return response;
        }else{
            let response = await axios.delete(url);
            return response;
        }
        
    }catch(err){
        return err.response;
    }
};
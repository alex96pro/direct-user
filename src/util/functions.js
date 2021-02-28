export function getClientDateAndTime() {
    let today = new Date();
    let day = today.getDate();
    day = day < 10 ? '0' + day : day;
    let month = today.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let hours = today.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = today.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return today.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
};

export function getClientTime() {
    let today = new Date();
    let hours = today.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = today.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return hours + ':' + minutes + ':' + seconds;
};

export function getClientDay() {
    let day = new Date().getDay();
    day = day === 0 ? 7 : day; // sunday is 0, backend format is 1-7
    return day;
};

export function checkDeliveryMinimumsForCart(meals) {

    let restaurantIds = [], restaurantNames = [], restaurantMinimums = [];

    meals.forEach(meal => {
        restaurantIds.push(meal.restaurantId); 
        restaurantNames.push(meal.restaurantName);
        restaurantMinimums.push(meal.deliveryMinimum);
    });

    restaurantIds = [...new Set(restaurantIds)];
    restaurantNames = [...new Set(restaurantNames)];
    restaurantMinimums = [...new Set(restaurantMinimums)];

    let restaurants = [];
    restaurantIds.forEach((id, i) => {
        restaurants.push({restaurantId: restaurantIds[i], restaurantName: restaurantNames[i], deliveryMinimum: restaurantMinimums[i], sum:0});
    });
    
    for(let i = 0; i < meals.length; i++){
        for(let j = 0; j < restaurants.length; j++){
            if(restaurants[j].restaurantId === meals[i].restaurantId){
                restaurants[j].sum += meals[i].price * meals[i].amount;
                break;
            }
        }
    }
    let deliveryMinimumConflicts = [];
    restaurants.forEach(restaurant => {
        if(restaurant.deliveryMinimum > restaurant.sum){
            deliveryMinimumConflicts.push({restaurantName: restaurant.restaurantName, deliveryMinimum: restaurant.deliveryMinimum});
        }
    });
    return deliveryMinimumConflicts;
};
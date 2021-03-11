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

export function calculateMealPrice(selectedModifiers, amount) {
    let base = +selectedModifiers.requiredBaseModifier.optionPrice;
    let required = selectedModifiers.requiredModifiers.reduce((sum, item) => sum += +item.optionPrice, 0);
    let optional = selectedModifiers.optionalModifiers.reduce((sum, item) => sum += +item.optionPrice, 0);
    return (Math.round((base + required + optional) * amount * 100) / 100).toFixed(2);
};

export function getRequiredBaseModifier(modifiers, price){
    for(let i = 0; i < modifiers.length; i++){
        if(modifiers[i].modifier.modifierType === "requiredBase"){
            return {modifierId: modifiers[i].modifierId, modifierName:modifiers[i].modifier.name, optionName: modifiers[i].modifier.defaultOption, optionPrice: modifiers[i].modifier.options[modifiers[i].modifier.defaultOption]};
        }
    }
    //meal has no required base modifier
    return {modifierId: -1, optionName: '', optionPrice: price};
};
export function getRequiredModifiers(modifiers){
    let modifiersArray = [];
    for(let i = 0; i < modifiers.length; i++){
        if(modifiers[i].modifier.modifierType === "required"){
            modifiersArray.push({
                modifierId: modifiers[i].modifierId, 
                modifierName: modifiers[i].modifier.name,
                optionName: modifiers[i].modifier.defaultOption, 
                optionPrice: modifiers[i].modifier.options[modifiers[i].modifier.defaultOption]
            });
        }
    }
    return modifiersArray;
};
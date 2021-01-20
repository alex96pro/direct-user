
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
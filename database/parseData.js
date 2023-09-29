const jsonFilePath = './data/baseFoodData.json'; // Replace with your JSON file path

const fs = require('fs');

const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

const foodArray = jsonData.FoundationFoods; // Access the array of food objects


const filteredFoodArray = [];

for (const food of foodArray) {

    const filteredByCal = food.foodNutrients.filter(nutrient => nutrient.nutrient.name.toLowerCase() === (('Energy').toLowerCase()) && nutrient.nutrient.unitName === "kcal")

    let filteredFoodObject = {
        foodName: food.description,
        foodCals: filteredByCal[0]?.amount,
        foodPortions: food.foodPortions
    }
    if(filteredByCal[0]?.amount){
        filteredFoodArray.push(filteredFoodObject);
    }
    
}

fs.appendFileSync('./data/parsedFoodData.json', JSON.stringify(filteredFoodArray, null, 2));
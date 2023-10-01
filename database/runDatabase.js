const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function main() {
    const db = await sqlite.open({
      filename: './foodData.sqlite',
      driver: sqlite3.Database
    });
    const allFood = await db.all('SELECT * FROM foodData');
    const allFoodPortions = await db.all('SELECT * FROM foodPortions');

    console.log(JSON.stringify(allFood, null, 2));
    //console.log(JSON.stringify(allFoodPortions, null, 2));

  db.close();
  
}

main().catch(console.error);

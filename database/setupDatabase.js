const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const fs = require('fs');

async function initializeDatabase() {
  const db = await open({
    filename: 'foodData.sqlite',
    driver: sqlite3.Database,
  });

  const jsonData = JSON.parse(fs.readFileSync('./data/parsedFoodData.json', 'utf8'));

  await db.exec(`
    CREATE TABLE IF NOT EXISTS foodData (
      id INTEGER PRIMARY KEY,
      foodName TEXT,
      foodCals INTEGER
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS foodPortions (
      id INTEGER PRIMARY KEY,
      value INTEGER,
      measureUnitName TEXT,
      measureUnitAbbreviation TEXT,
      modifier TEXT,
      gramWeight REAL,
      sequenceNumber INTEGER,
      minYearAcquired INTEGER,
      amount INTEGER,
      foodId INTEGER REFERENCES foodData(id)
    )
  `);

  await db.run('BEGIN');
  try {
    const result = await db.prepare('INSERT INTO foodData (foodName, foodCals) VALUES (?, ?)');

    for (const foodData of jsonData) {
      await result.run(foodData.foodName, foodData.foodCals);
      const foodId = result.lastID;
      if (foodData.foodPortions) {
        const insertPortion = await db.prepare(`
          INSERT INTO foodPortions (
            foodId,
            value,
            measureUnitName,
            measureUnitAbbreviation,
            modifier,
            gramWeight,
            sequenceNumber,
            minYearAcquired,
            amount
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        for (const portion of foodData.foodPortions) {
          await insertPortion.run(
            foodId,
            portion.value,
            portion.measureUnit.name,
            portion.measureUnit.abbreviation,
            portion.modifier,
            portion.gramWeight,
            portion.sequenceNumber,
            portion.minYearAcquired,
            portion.amount
          );
        }

        await insertPortion.finalize();
      }
    }

    

    await result.finalize();
    await db.run('COMMIT');
  } catch (err) {
    console.error(err);
    await db.run('ROLLBACK');
  } finally {
    await db.close();
  }
}

initializeDatabase();

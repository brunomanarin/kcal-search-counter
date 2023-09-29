const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const fs = require('fs');

async function initializeDatabase() {
  // Open the SQLite database
  const db = await open({
    filename: 'mydb.sqlite',
    driver: sqlite3.Database,
  });

  // Read the JSON data from the file
  const jsonData = JSON.parse(fs.readFileSync('./data/parsedFoodData.json', 'utf8'));

  // Define the table schema and insert data
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
      foodId INTEGER,
      value INTEGER,
      measureUnitName TEXT,
      measureUnitAbbreviation TEXT,
      modifier TEXT,
      gramWeight REAL,
      sequenceNumber INTEGER,
      minYearAcquired INTEGER,
      amount INTEGER,
      foodId REFERENCES foodData(id)
    )
  `);

  // Insert data into the tables using transactions
  await db.run('BEGIN');
  try {
    const result = await db.run('INSERT INTO foodData (foodName, foodCals) VALUES (?, ?)', [
      jsonData.foodName,
      jsonData.foodCals,
    ]);

    const foodId = result.lastID;

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

    for (const portion of jsonData.foodPortions) {
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
    await db.run('COMMIT');
  } catch (err) {
    console.error(err);
    await db.run('ROLLBACK');
  } finally {
    // Close the database connection
    await db.close();
  }
}

initializeDatabase();

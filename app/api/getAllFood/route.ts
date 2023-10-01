import { NextResponse } from 'next/server';
import * as sqlite from 'sqlite';
import * as sqlite3 from 'sqlite3';

export async function GET(){
  try {
    const db = await sqlite.open({
      filename: './foodData.sqlite',
      driver: sqlite3.Database
    });
    const allFoodData = await db.all("SELECT * FROM foodData");
    await db.close();
    return NextResponse.json(allFoodData);
  } catch (error) {
    return NextResponse.json({ message: `Internal server error: ${error}`, status: 500 })
  }
}


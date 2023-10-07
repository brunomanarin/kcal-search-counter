import {NextRequest,  NextResponse } from 'next/server';
import * as sqlite from 'sqlite';
import * as sqlite3 from 'sqlite3';

export async function POST(req: NextRequest){
  const body = await req.json()
  try {
    const db = await sqlite.open({
      filename: './foodData.sqlite',
      driver: sqlite3.Database
    });
    const result = await db.all('SELECT * FROM foodData WHERE foodName LIKE ?', [`%${body.query}%`]);
    await db.close();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: `Internal server error: ${error}`, status: 500 })
  }
}


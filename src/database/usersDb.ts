import sqlite3 from 'sqlite3';
import { UserSchema } from "../core/interfaces.ts";

// Use the default database connection from connect.ts
const db = require('./connect.ts').default;

// No need for a collection variable, directly use the table name
// export const users = db.collection<UserSchema>("BOTUSERS");

export async function addUser(userId: number) {
  await db.run('INSERT INTO BOTUSERS (userID) VALUES (?)', [userId]);
}

export async function removeUser(userId: number) {
  await db.run('DELETE FROM BOTUSERS WHERE userID = ?', [userId]);
}

export async function countUsers() {
  const count = await db.get('SELECT COUNT(*) FROM BOTUSERS WHERE userID <> 0');
  return count.values[0]; // Extract the count value
}

export async function addAll(usrs: number[]) {
  const values = usrs.map((user) => [user]); // Prepare values for bulk insertion
  await db.run('INSERT INTO BOTUSERS (userID) VALUES (?)', values);
}

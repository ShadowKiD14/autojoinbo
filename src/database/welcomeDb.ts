import sqlite3 from 'sqlite3';
import { SettingsSchema } from "../core/interfaces.ts";

// Access the default database connection
const db = require('./connect.ts').default;

// Use the table name directly
// const settings = db.collection<SettingsSchema>("CHAT_SETTINGS");

export async function setWelcome(chatID: number, welcome: string) {
  const chat = await db.get('SELECT * FROM CHAT_SETTINGS WHERE chatID = ?', [chatID]);
  if (!chat.values.length) {
    await db.run('INSERT INTO CHAT_SETTINGS (chatID, status, welcome) VALUES (?, ?, ?)', [chatID, true, welcome]);
    return;
  }
  await db.run('UPDATE CHAT_SETTINGS SET welcome = ? WHERE chatID = ?', [welcome, chatID]);
}

export async function setStatus(chatID: number, status: boolean) {
  const chat = await db.get('SELECT * FROM CHAT_SETTINGS WHERE chatID = ?', [chatID]);
  if (!chat.values.length) {
    await db.run('INSERT INTO CHAT_SETTINGS (chatID, status, welcome) VALUES (?, ?, ?)', [chatID, status, ""]);
    return;
  }
  await db.run('UPDATE CHAT_SETTINGS SET status = ? WHERE chatID = ?', [status, chatID]);
}

export async function getSettings(chatID: number) {
  const chatsetting = await db.get('SELECT * FROM CHAT_SETTINGS WHERE chatID = ?', [chatID]);
  return chatsetting.values[0] ?? null; // Return the first result or null
}

export async function getAllSettings() {
  const chatsettings = await db.all('SELECT * FROM CHAT_SETTINGS');
  return chatsettings.map((row) => row.values); // Extract values from each row
}

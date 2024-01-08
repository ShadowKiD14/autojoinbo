import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('ChannelActions.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

export default db;

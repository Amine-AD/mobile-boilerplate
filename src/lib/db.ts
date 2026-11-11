import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite';

/**
 * Local SQLite database for the app's real data.
 *
 * To change the schema, APPEND a new migration to the list below — never edit one that already
 * shipped. Each migration runs once, in order, tracked by SQLite's `user_version`.
 */
const MIGRATIONS: string[] = [
  // 1 — example table; replace with your app's tables.
  `CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );`,
];

export const DATABASE_NAME = 'app.db';

export const db: SQLiteDatabase = openDatabaseSync(DATABASE_NAME);

export function migrateDatabase(database: SQLiteDatabase = db) {
  database.execSync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  const row = database.getFirstSync<{ user_version: number }>('PRAGMA user_version');
  const current = row?.user_version ?? 0;

  for (let version = current; version < MIGRATIONS.length; version++) {
    database.withTransactionSync(() => {
      database.execSync(MIGRATIONS[version]);
      database.execSync(`PRAGMA user_version = ${version + 1}`);
    });
  }
}

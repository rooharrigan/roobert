import { Base, CallbackFunction } from "db-migrate-base";

export function up(db: Base, callback: CallbackFunction): null {
  db.createTable(
    "page_views",
    {
      id: { type: "string", length: 36, primaryKey: true },
      url: { type: "varchar", length: 2083, notNull: true },
      date: { type: "datetime", defaultValue: "CURRENT_TIMESTAMP" },
      view_duration_ms: { type: "time", length: 10}
    },
    callback
  );

  return null;
}

export function down(db: Base, callback: CallbackFunction) {
  db.dropTable("page_views");
}

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { vectorColumn } from "./blob";
import { sql } from "drizzle-orm";

export const resources = sqliteTable("resources", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const embeddings = sqliteTable("embeddings", {
  id: text("id").primaryKey(),
  resourceId: integer("resource_id").references(() => resources.id, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  embedding: vectorColumn("embedding", {
    length: 768,
  }),
});
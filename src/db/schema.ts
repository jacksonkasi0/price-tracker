import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  numeric,
  integer,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

// Products Table
export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(), // Unique product ID
  name: text("name").notNull(), // Product name
  url: text("url").notNull(), // Product link (key)
  platform: text("platform").notNull(), // Platform: 'amazon', 'ebay', 'walmart'
  min_price: numeric("min_price").notNull(), // Minimum target price
  max_price: numeric("max_price").notNull(), // Maximum target price
  current_price: numeric("current_price"), // Current price (nullable initially)
  kv_key: text("kv_key").notNull(), // Associated KV key
  last_snapshot_id: text("last_snapshot_id"), // Last snapshot ID (optional)
  created_at: timestamp("created_at").defaultNow(), // Creation timestamp
});

export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;

// Price History Table
export const priceHistoryTable = pgTable("price_history", {
  id: serial("id").primaryKey(), // Unique record ID
  product_id: integer("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "cascade" }), // Foreign key to products
  price: numeric("price").notNull(), // Price at the recorded time
  date: timestamp("date").defaultNow(), // Timestamp
});

// ** __________ RELATIONS __________ **

// Defining relations for the products table
export const productRelations = relations(productsTable, ({ many }) => ({
  price_history: many(priceHistoryTable), // A product can have multiple price history entries
}));

// Defining relations for the price history table
export const priceHistoryRelations = relations(
  priceHistoryTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [priceHistoryTable.product_id], // Relation field in price history
      references: [productsTable.id], // Field in the products table
    }),
  })
);

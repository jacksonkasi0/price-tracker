import { relations } from "drizzle-orm";
import { pgTable, text, integer, serial, timestamp } from "drizzle-orm/pg-core";

// Products Table
export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),                  // Unique product ID
  name: text("name").notNull(),                   // Product name
  url: text("url").notNull(),                     // Product link
  platform: text("platform").notNull(),           // Platform: 'amazon', 'ebay', 'walmart'
  min_price: integer("min_price").notNull(),      // Minimum target price
  max_price: integer("max_price").notNull(),      // Maximum target price
  current_price: integer("current_price"),        // Current price (nullable initially)
  kv_key: text("kv_key").notNull(),               // Associated KV key
  created_at: timestamp("created_at").defaultNow(), // Creation timestamp
});


export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;

// Price History Table
export const priceHistoryTable = pgTable("price_history", {
  id: serial("id").primaryKey(),                    // Unique record ID
  product_id: integer("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "cascade" }), // Foreign key to products
  price: integer("price").notNull(),                // Price at the recorded time
  date: timestamp("date").defaultNow(),             // Timestamp
});

// ** __________ RELATIONS __________ **

// Defining relations for the products table
export const productRelations = relations(productsTable, ({ many }) => ({
  price_history: many(priceHistoryTable), // A product can have multiple price history entries
}));

// Defining relations for the price history table
export const priceHistoryRelations = relations(priceHistoryTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [priceHistoryTable.product_id], // Relation field in price history
    references: [productsTable.id],         // Field in the products table
  }),
}));

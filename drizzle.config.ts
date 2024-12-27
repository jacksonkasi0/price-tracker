import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts",    // Schema file path
  out: "./migrations",         // Migrations folder path
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

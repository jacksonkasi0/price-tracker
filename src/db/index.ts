import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" }); // Load environment variables

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
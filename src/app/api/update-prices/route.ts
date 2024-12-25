import { db } from "@/db";
import { productsTable, priceHistoryTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const POST = async () => {
  const allProducts = await db.select().from(productsTable).execute();

  // TODO: Update prices for all products using upstash workflow

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

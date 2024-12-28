// src/app/api/cron/route.ts

// ** import db & schema
import { db } from "@/db";
import { productsTable } from "@/db/schema";

// ** import utils
import { productScraperTrigger } from "@/utils/scraper";

export const runtime = "edge";

export const GET = async () => {
  // Fetch all products from the database
  const allProducts = await db.select().from(productsTable).execute();

  // Extract URLs from the products
  const productUrls = allProducts.map((product) => product.url);

  // Pass all URLs at once to the scraper trigger
  await productScraperTrigger(productUrls);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

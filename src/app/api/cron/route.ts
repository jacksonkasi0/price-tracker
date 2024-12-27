// ** import db & schema
import { db } from "@/db";
import { productsTable } from "@/db/schema";

// ** import utils
import { fetchPrice } from "@/utils/scraper";

export const runtime = "edge";

export const POST = async () => {
  const allProducts = await db.select().from(productsTable).execute();

  await Promise.all(
    allProducts.map(async (product) => {
      await fetchPrice(product.url); // TODO: Implement scraper
    })
  );

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

import { eq } from "drizzle-orm";

// ** import third-party lib
import { getRequestContext } from "@cloudflare/next-on-pages";

// ** import db & schema
import { db } from "@/db";
import { productsTable, priceHistoryTable } from "@/db/schema";

// ** import utils
import { fetchPrice } from "@/utils/scraper";
import { sendSms } from "@/utils/alerts/send-sms";
import { sendEmail } from "@/utils/alerts/send-mail";

export const runtime = 'edge';

// https://price-tracker-1sh.pages.dev/api/update-prices
export const POST = async () => {
  // Initialize Cloudflare KV binding
  const kv = getRequestContext().env.PRICE_TRACKER;

  const allProducts = await db.select().from(productsTable).execute();

  await Promise.all(
    allProducts.map(async (product) => {
      const priceData = await fetchPrice(product.url); // TODO: Implement scraper
      const current_price = priceData.price;
      const productData = priceData.product_data;

      // Update the current price in the database
      await db
        .update(productsTable)
        .set({ current_price })
        .where(eq(productsTable.id, product.id));

      // Add price history entry
      await db.insert(priceHistoryTable).values({
        product_id: product.id,
        price: current_price,
      });

      // Get existing product data from KV (optional)
      const productKV = JSON.parse((await kv.get(product.kv_key)) || "{}");

      // Update KV with new product data with existing data (optional)
      await kv.put(
        product.kv_key,
        JSON.stringify({ ...productKV, ...productData })
      );

      // Send email notification if the price is less than or equal to max price
      if (current_price <= product.max_price) {
        sendEmail(product.name, current_price, product.url); // TODO: Implement email logic
      }

      // Send SMS notification if the price is less than or equal to min price
      if (current_price <= product.min_price) {
        sendSms(product.name, current_price, product.url); // TODO: Implement SMS logic
      }
    })
  );

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

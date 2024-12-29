// ** import db & schema
import { db } from "@/db";
import { productsTable } from "@/db/schema";

// ** import utils
import { productScraperTrigger } from "@/utils/scraper";

export const runtime = "edge";

// https://price-tracker-1sh.pages.dev/api/cron
export const GET = async () => {
  try {
    // Fetch all products from the database
    const allProducts = await db.select().from(productsTable).execute();

    // Check if no products are found
    if (allProducts.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "No products found" }),
        { status: 404 }
      );
    }

    // Extract URLs from the products
    const productUrls = allProducts.map((product) => product.url);

    // Pass all URLs at once to the scraper trigger
    await productScraperTrigger(productUrls);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error during GET request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};

// ** import 3rd party libraries
import { nanoid } from "nanoid";
import { getRequestContext } from "@cloudflare/next-on-pages";

// ** import database utilities and schema
import { db } from "@/db";
import { InsertProduct, productsTable } from "@/db/schema";
import { count } from "drizzle-orm";

export const runtime = "edge";

// POST: Create a new product
export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const { name, url, platform, min_price, max_price }: InsertProduct =
      await req.json();

    if (!name || !url || !platform || min_price == null || max_price == null) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Initialize KV storage
    const kv = getRequestContext().env.PRICE_TRACKER;
    const kvKey = `product_${nanoid()}`;

    // Add an empty entry to KV
    await kv.put(kvKey, JSON.stringify({}));

    // Insert into database
    const [insertedProduct] = await db
      .insert(productsTable)
      .values({
        name,
        url,
        platform,
        min_price,
        max_price,
        kv_key: kvKey,
      })
      .returning();

    return new Response(
      JSON.stringify({ success: true, product: insertedProduct }),
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error in POST /api/products:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    // Parse query parameters for pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(url.searchParams.get("limit") || "10", 10); // Default limit 10
    const offset = (page - 1) * limit;

    // Retrieve paginated products from the database
    const products = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        url: productsTable.url,
        platform: productsTable.platform,
        min_price: productsTable.min_price,
        max_price: productsTable.max_price,
        current_price: productsTable.current_price,
      })
      .from(productsTable)
      .offset(offset)
      .limit(limit);

    // Count the total number of products
    const totalProducts = await db
      .select({ count: count() })
      .from(productsTable);

    // Respond with the products and pagination metadata
    return new Response(
      JSON.stringify({
        success: true,
        products,
        pagination: {
          total: totalProducts[0].count,
          page,
          limit,
        },
      }),
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error("Error in GET /api/products:", error);

    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "An unknown error occurred" }),
      {
        status: 500,
      }
    );
  }
};

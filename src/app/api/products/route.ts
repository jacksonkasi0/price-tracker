// ** import 3rd party libraries
import { nanoid } from "nanoid";
import { getRequestContext } from "@cloudflare/next-on-pages";

// ** import database utilities and schema
import { db } from "@/db";
import { InsertProduct, productsTable } from "@/db/schema";

export const runtime = "edge";

// api/products POST
export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const { name, url, platform, min_price, max_price }: InsertProduct =
      await req.json();

    // Validate required fields
    if (!name || !url || !platform || min_price == null || max_price == null) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    // Round min_price and max_price to the nearest integer
    const roundedMinPrice = Math.round(min_price);
    const roundedMaxPrice = Math.round(max_price);

    // Validate rounded prices
    if (isNaN(roundedMinPrice) || isNaN(roundedMaxPrice)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid price values",
        }),
        {
          status: 400,
        }
      );
    }

    // Initialize Cloudflare KV binding
    const kv = getRequestContext().env.PRICE_TRACKER;

    // Generate a unique KV key
    const kv_key = `product_${nanoid()}`;

    // Add an empty object to KV for the product
    await kv.put(kv_key, JSON.stringify({}));

    // Insert the product into the database
    const [insertedProduct] = await db
      .insert(productsTable)
      .values({
        name,
        url,
        platform,
        min_price: roundedMinPrice,
        max_price: roundedMaxPrice,
        kv_key,
      })
      .returning(); // Ensure you retrieve the inserted product

    // Respond with the inserted product
    return new Response(
      JSON.stringify({ success: true, product: insertedProduct }),
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error in POST /api/products:", error);

    // Check if the error is an instance of Error and respond accordingly
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
        }
      );
    }

    // Fallback for unknown error types
    return new Response(
      JSON.stringify({ success: false, error: "An unknown error occurred" }),
      {
        status: 500,
      }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    // Retrieve all products from the database
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
      .from(productsTable);

    // Respond with the products
    return new Response(JSON.stringify({ success: true, products }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("Error in GET /api/products:", error);

    // Check if the error is an instance of Error and respond accordingly
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
        }
      );
    }

    // Fallback for unknown error types
    return new Response(
      JSON.stringify({ success: false, error: "An unknown error occurred" }),
      {
        status: 500,
      }
    );
  }
};

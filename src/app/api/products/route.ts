// ** import 3rd party libraries
import { nanoid } from "nanoid";
import { getRequestContext } from "@cloudflare/next-on-pages";

// ** import database utilities and schema
import { db } from "@/db";
import { InsertProduct, productsTable } from "@/db/schema";

export const runtime = 'edge';

// api/products POST
export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const { name, url, platform, min_price, max_price }: InsertProduct =
      await req.json();

    // Validate required fields
    if (!name || !url || !platform || !min_price || !max_price) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
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
        min_price,
        max_price,
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

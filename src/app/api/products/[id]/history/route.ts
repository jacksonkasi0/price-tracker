import { eq } from "drizzle-orm";

// ** Import database utilities and schema
import { db } from "@/db";
import { priceHistoryTable } from "@/db/schema";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  // Await the `params` to ensure they are resolved
  const { id } = await params;

  // Convert `id` to a number
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid product ID" }),
      { status: 400 }
    );
  }

  const history = await db
    .select()
    .from(priceHistoryTable)
    .where(eq(priceHistoryTable.product_id, productId));

  return new Response(JSON.stringify({ success: true, history }), {
    status: 200,
  });
};

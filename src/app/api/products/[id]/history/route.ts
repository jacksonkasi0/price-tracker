import { eq } from "drizzle-orm";

import { db } from "@/db";
import { priceHistoryTable } from "@/db/schema";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const history = await db
    .select()
    .from(priceHistoryTable)
    .where(eq(priceHistoryTable.product_id, parseInt(params.id, 10)));

  return new Response(JSON.stringify(history), { status: 200 });
};

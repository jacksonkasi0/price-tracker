ALTER TABLE "price_history" ADD COLUMN "snapshot_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "last_snapshot_id" text;
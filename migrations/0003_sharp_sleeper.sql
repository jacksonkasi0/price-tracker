ALTER TABLE "price_history" ALTER COLUMN "price" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "min_price" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "max_price" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "current_price" SET DATA TYPE numeric;
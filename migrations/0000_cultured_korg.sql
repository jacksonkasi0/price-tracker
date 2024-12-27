CREATE TABLE "price_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"price" integer NOT NULL,
	"date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"platform" text NOT NULL,
	"min_price" integer NOT NULL,
	"max_price" integer NOT NULL,
	"current_price" integer,
	"kv_key" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "product" ADD COLUMN "product_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "userType" text DEFAULT 'buyer';
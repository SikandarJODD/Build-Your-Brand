import { pgTable, foreignKey, pgEnum, text, timestamp, unique, numeric, bigint } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])


export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	username: text("username").notNull(),
	password: text("password").notNull(),
	userType: text("userType").default('buyer'),
},
(table) => {
	return {
		userUsernameUnique: unique("user_username_unique").on(table.username),
	}
});

export const sellerProfile = pgTable("seller_profile", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	name: text("name").notNull(),
	email: text("email"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	totalProducts: numeric("total_products").default('0'),
});

export const buyerProfile = pgTable("buyer_profile", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	name: text("name").notNull(),
	email: text("email"),
	phone: text("phone"),
	address: text("address"),
	city: text("city"),
	state: text("state"),
	zip: text("zip"),
	country: text("country"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const order = pgTable("order", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull(),
	productId: text("product_id").notNull(),
	name: text("name").notNull(),
	desc: text("desc"),
	quantity: text("quantity").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	price: text("price"),
	productUrl: text("product_url"),
});

export const product = pgTable("product", {
	id: text("id").primaryKey().notNull(),
	sellerId: text("seller_id").notNull(),
	productId: text("product_id").notNull(),
	name: text("name").notNull(),
	description: text("description"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	price: bigint("price", { mode: "number" }).notNull(),
	stock: text("stock").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	productUrl: text("product_url").notNull(),
	priceId: text("price_id"),
});
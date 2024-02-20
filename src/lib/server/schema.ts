import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    userType: text("userType").default('buyer'),
});

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});


export const buyer_profile = pgTable("buyer_profile", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    zip: text("zip"),
    country: text("country"),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
});

// ecommerce product schema 


// seller profile to sell the product

export const seller_profile = pgTable("seller_profile", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    name: text("name").notNull(),
    email: text("email"),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
    total_products: numeric("total_products").default("0"),
});
export const productTable = pgTable("product", {
    id: text("id").primaryKey(),
    sellerId: text("seller_id")
        .notNull()
        .references(() => seller_profile.id),
    product_id: text("product_id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    price: text("price").notNull(),
    stock: text("stock").notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
});

// order table
export const orderTable = pgTable("order", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    productId: text("product_id")
        .notNull()
        .references(() => productTable.id),
    name: text("name").notNull(),
    desc: text("desc"),
    quantity: text("quantity").notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
});


import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  jsonb,
} from "drizzle-orm/pg-core"

// ----- Better Auth tables (do not rename columns) -----
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// ----- App tables -----
export type ItineraryDay = {
  day: number
  title: string
  description: string
}

export type AboutValue = {
  title: string
  body: string
}

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  region: text("region").notNull(),
  summary: text("summary").default("").notNull(),
  description: text("description").default("").notNull(),
  price: integer("price").default(0).notNull(),
  durationDays: integer("duration_days").default(1).notNull(),
  startLocation: text("start_location").default("").notNull(),
  endLocation: text("end_location").default("").notNull(),
  maxGroupSize: integer("max_group_size").default(12).notNull(),
  difficulty: text("difficulty").default("Moderate").notNull(),
  mainImage: text("main_image").default("").notNull(),
  gallery: jsonb("gallery").$type<string[]>().default([]).notNull(),
  highlights: jsonb("highlights").$type<string[]>().default([]).notNull(),
  included: jsonb("included").$type<string[]>().default([]).notNull(),
  itinerary: jsonb("itinerary").$type<ItineraryDay[]>().default([]).notNull(),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const aboutPage = pgTable("about_page", {
  id: serial("id").primaryKey(),
  slug: text("slug").default("main").notNull().unique(),
  heroEyebrow: text("hero_eyebrow").default("About Us").notNull(),
  heroTitle: text("hero_title")
    .default("Thoughtful journeys, made by people who know Vietnam.")
    .notNull(),
  heroImage: text("hero_image")
    .default("/images/Vietnam/Ha_Long_Bay_2.jpg")
    .notNull(),
  introEyebrow: text("intro_eyebrow").default("Tour Vietnam").notNull(),
  introTitle: text("intro_title")
    .default(
      "We build tours around real places, real timing, and real local care.",
    )
    .notNull(),
  introBody: jsonb("intro_body").$type<string[]>().default([]).notNull(),
  values: jsonb("values").$type<AboutValue[]>().default([]).notNull(),
  featureEyebrow: text("feature_eyebrow").default("How we work").notNull(),
  featureTitle: text("feature_title")
    .default("Clear plans, local guides, room for the unexpected.")
    .notNull(),
  featureBody: text("feature_body").default("").notNull(),
  featureImage: text("feature_image")
    .default(
      "/images/Vietnam/lanterns-hoi-an-danang-vietnam-travel-solo-main-image-hd-op.jpg",
    )
    .notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Tour = typeof tours.$inferSelect
export type NewTour = typeof tours.$inferInsert
export type AboutPage = typeof aboutPage.$inferSelect

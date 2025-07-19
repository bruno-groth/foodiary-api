import { pgTable, varchar, integer, uuid, date } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users',
    {
        id: uuid().primaryKey().defaultRandom(),
        name: varchar({ length: 255 }).notNull(),
        email: varchar({ length: 255 }).notNull().unique(),
        password: varchar({ length: 255 }).notNull(),
        goal: varchar({ length: 20 }).notNull(),
        gender: varchar({ length: 6 }).notNull(),
        birthDate: date('birth_date').notNull(),
        weight: integer().notNull(),
        height: integer().notNull(),
        activityLevel: integer('activity_level').notNull(),

        // goals
        calories: integer().notNull(),
        proteins: integer().notNull(),
        carbs: integer().notNull(),
        fats: integer().notNull(),
    }
)
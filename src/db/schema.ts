import { pgTable, varchar, integer, uuid, date, pgEnum, json } from "drizzle-orm/pg-core";

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
);

export const mealStatus = pgEnum('meal_status', ['uploading', 'queued', 'processing', 'success', 'failed']);
export const mealInputType = pgEnum('meal_input_type', ['audio', 'picture']);

export const mealsTable = pgTable('meals',
    {
        id: uuid().primaryKey().defaultRandom(),
        userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
        status: mealStatus().notNull(),
        inputType: mealInputType('input_type').notNull(),
        inputFileKey: varchar('input_file_key', { length: 255 }).notNull(),
        name: varchar({ length: 255 }).notNull(),
        icon: varchar({ length: 255 }).notNull(),
        foods: json(),
        createdAt: date('created_at').notNull().defaultNow(),
    }
);
import z from "zod";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, conflict, created } from "../utils/http";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { hash } from 'bcryptjs';

// validação
const schema = z.object({
    goal: z.enum(['lose_weight', 'maintain_weight', 'gain_weight']),
    gender: z.enum(['male', 'female']),
    birthDate: z.iso.date(),
    height: z.number().min(50, "Height must be at least 50 cm").max(250, "Height must be at most 250 cm"),
    weight: z.number().min(20, "Weight must be at least 20 kg"),
    activityLevel: z.number().min(1).max(5),
    account: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.email(),
        password: z.string().min(8, "Password must be at least 8 characters long"),
    }),
});

export class SignUpController {
    static async handle(request: HttpRequest): Promise<HttpResponse> {

        const { success, error, data } = schema.safeParse(request.body);

        if (!success) {
            return badRequest({ errors: error.issues })
        }
        const userAlreadyExists = await db.query.usersTable.findFirst({
            columns: {
                email: true,
            },
            where: eq(usersTable.email, data.account.email),
        });

        if (userAlreadyExists) {
            return conflict({ message: "This email is already in use." });
        }

        const passwordHash = await hash(data.account.password, 8);

        const [user] = await db.insert(usersTable).values({
            ...data,
            ...data.account,
            password: passwordHash,
            calories: 0,
            proteins: 0,
            carbs: 0,
            fats: 0,
        })
            .returning({ id: usersTable.id });


        return created({
            userId: user.id,
        })
    };
}
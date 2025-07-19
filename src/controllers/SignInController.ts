import { z } from "zod";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, ok, unauthorized } from "../utils/http";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import id from "zod/v4/locales/id.cjs";
import { generateSignAccessToken } from "../lib/jwt";

const schema = z.object({
    email: z.email(),
    password: z.string().min(8, "Password must be at least 6 characters long"),
})

export class SignInController {
    static async handle(request: HttpRequest): Promise<HttpResponse> {

        const { success, error, data } = schema.safeParse(request.body);

        if (!success) {
            return badRequest({ errors: error.issues })
        }

        const user = await db.query.usersTable.findFirst({
            columns: {
                id: true,
                email: true,
                password: true,
            },
            where: eq(usersTable.email, data.email),
        });

        if (!user) {
            return unauthorized({ message: "Invalid email or password." });
        }

        const isPasswordValid = await compare(data.password, user.password);

        if (!isPasswordValid) {
            return unauthorized({ message: "Invalid email or password." });
        }

        const accessToken = generateSignAccessToken(user.id);

        return ok({ accessToken })
    }
}
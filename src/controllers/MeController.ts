import { eq } from "drizzle-orm";
import { HttpRequest, HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { ok } from "../utils/http";
import { db } from "../db";
import { usersTable } from "../db/schema";


export class MeController {
    static async handle(request: ProtectedHttpRequest): Promise<HttpResponse> {


        const user = await db.query.usersTable.findFirst({
            columns: {
                id: true,
                email: true,
                name: true,
                calories: true,
                proteins: true,
                carbs: true,
                fats: true,
            },
            where: eq(usersTable.id, request.userId),
        })

        return ok({ user });
    }

}
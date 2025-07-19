import { z } from "zod";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, ok } from "../utils/http";

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

        return ok({ accessToken: 'token' })
    }
}
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { MeController } from "../controllers/MeController";
import { parseHttpEvent } from "../utils/parseHttpEvent";
import { parseHttpResponse } from "../utils/ParseHttpResponse";
import { parseProtectedEvent } from "../lib/parseProtectedEvent";

export async function handler(event: APIGatewayProxyEventV2) {
    try {
        const request = parseProtectedEvent(event);

        const response = await MeController.handle(request);

        return await parseHttpResponse(response);
    } catch (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Invalid access token' }),
        };
    }
}
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ProtectedHttpRequest } from "../types/Http";
import { parseHttpEvent } from "../utils/parseHttpEvent";
import { validateAccessToken } from "./jwt";

export function parseProtectedEvent(event: APIGatewayProxyEventV2): ProtectedHttpRequest {
    const baseEvent = parseHttpEvent(event);

    const { authorization } = event.headers;

    if (!authorization) {
        throw new Error("Unauthorized: Missing Authorization header");
    }

    const [, token] = authorization.split(' ');

    const userId = validateAccessToken(token);

    if (!userId) {
        throw new Error("Unauthorized: Invalid access token");
    }

    return {
        ...baseEvent,
        userId: userId,
    }

}    
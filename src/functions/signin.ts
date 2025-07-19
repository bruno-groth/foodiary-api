import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SignInController } from "../controllers/SignInController";
import { parseHttpEvent } from "../utils/parseHttpEvent";

export async function handler(event: APIGatewayProxyEventV2) {
    const request = parseHttpEvent(event);

    await SignInController.handle(request);
}
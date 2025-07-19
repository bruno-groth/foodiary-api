import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SignUpController } from "../controllers/SignUpController";
import { parseHttpEvent } from "../utils/parseHttpEvent";

export async function handler(event: APIGatewayProxyEventV2) {
    const request = parseHttpEvent(event);

    return await SignUpController.handle(request);
}
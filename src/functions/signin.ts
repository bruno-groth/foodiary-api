import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SignInController } from "../controllers/SignInController";

export async function handler(event: APIGatewayProxyEventV2) {
    const body = JSON.parse(event.body ?? '{}');
    const params = event.pathParameters ?? {};
    const queryParams = event.queryStringParameters ?? {};

    await SignInController.handle({
        body,
        params,
        queryParams
    });
}
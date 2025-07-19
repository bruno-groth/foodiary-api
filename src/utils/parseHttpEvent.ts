import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { HttpRequest } from '../types/Http';

/**
 * Parses an AWS API Gateway event into a standardized HttpRequest format.
 * 
 * Feito para desacoplar os argumentos, para não precisar ficar dependente do serverless.
 * Facilita sair do serverless e ir para um ambiente provisionado etc.
 * Só precisaria mudar de onde vem o body, params e queryParams.
 * 
 * @param event - The API Gateway event to parse.
 * @returns An object containing the body, query parameters, and path parameters.
 */
export function parseHttpEvent(event: APIGatewayProxyEventV2): HttpRequest {
    const body = JSON.parse(event.body ?? '{}');
    const params = event.pathParameters ?? {};
    const queryParams = event.queryStringParameters ?? {};

    return {
        body,
        params,
        queryParams
    };
}
import { HttpResponse } from "../types/Http";

export function parseHttpResponse(response: HttpResponse): Record<string, any> {
    return {
        statusCode: response.statusCode,
        body: JSON.stringify(response.body || {})
    };
}
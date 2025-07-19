import { HttpResponse } from "../types/Http";

export function ok (body?: Record<string, any>): HttpResponse {
    return {
        statusCode: 200,
        body: JSON.stringify(body || {})
    };
}

export function created (body?: Record<string, any>): HttpResponse {
    return {
        statusCode: 201,
        body: JSON.stringify(body || {})
    };
}

export function badRequest (body?: Record<string, any>): HttpResponse {
    return {
        statusCode: 400,
        body: JSON.stringify(body || {})
    };
}

export function notFound (body?: Record<string, any>): HttpResponse {
    return {
        statusCode: 404,
        body: JSON.stringify(body || {})
    };
}
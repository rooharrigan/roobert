/*
* Helpers for standardizing inputs and outputs
*/
export enum PublicApis {
    TRACK = 'track',
    REPORTING = 'reporting',
}

export interface ApiOut {
    ok: boolean;
}

export interface ApiError {
    ok: boolean;
    error: string;
}

export interface ApiOk {
    ok: boolean;
    out: string;
}

/*
* lib result for standardized error handling (as an alternative to throwing exceptions)
*/

export type ResultOk<T> = {
    'ok' : boolean;
    'out' : T;
}

export function result_ok<T>(output: T): ResultOk<T> {
    const ret = {
        'ok' : true,
        'out' : output,
    }
    return ret;
}

export interface RetError {
    ok: boolean;
    error: string;
}

export function result_error(err: string): RetError {
    const ret = {
        'ok' : false,
        'error' : err,
    }
    return ret;
}
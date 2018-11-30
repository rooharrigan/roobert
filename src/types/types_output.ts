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

export enum PublicApis {
    TRACK = 'track',
    REPORTING = 'reporting',
}
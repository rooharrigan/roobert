export interface ApiTrackInputs {
    visitor_token: VisitorToken;
    event_type: TrackEventType;
    payload: string;
}

export enum ImpressionType {
    personalized = 'personalized'
}

export enum TrackEventType {
    page_view = 'page_view',
    user = 'user'
}

export enum TrackEventUserEventType {
    conversion = 'conversion',
}

export interface TrackEventPayload {
    impression_token: string;
}

export enum ReportType {
    webpage_metrics = 'pages',
    visitor_metrics = 'visitors',
}

/*
* Sub-types of TrackEventPayoad type
*/
export interface TrackEventPageViewPayload {
    url: string;
    impression_token: string;
    session_token: string;
    impression_type: string;
}

export interface TrackEventUserPayload {
    impression_token: string;
    event_name: TrackEventUserEventType;
}

/*
* Use an opaque type here to ensure all tokens are UUID-verified
*/
export type VisitorToken = string;

export enum TokenTypes {
    visitor_token = 'visitor_token',
    user_token = 'user_token',
    session_token = 'session_token'
}
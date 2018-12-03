import { Token } from '../types/types_logic';

/* 
* Enums
*/ 
export type TrackEventPageViewImpressionType = string;
export enum TrackEventPageViewImpressionTypes {
    personalized = 'personalized',
    control = 'control',
}

export type TrackEventUserEventType = string;
export enum TrackEventUserEventTypes {
    conversion = 'conversion',
}

export type TrackEventType = string;
export enum TrackEventTypes {
    page_view = 'page_view',
    user_event = 'user_event'
}

/* 
* Interfaces
*/ 
export interface ApiTrackInputs {
    visitor_token: Token;
    event_type: TrackEventType;
    payload: string;
}

export interface TrackEventPayload {
    impression_token: string;
}
/*
* Sub-type of TrackEventPayoad type
*/
export interface TrackEventPageViewPayload {
    url: string;
    impression_token: string;
    session_token: string;
    impression_type: string;
    elapsed_time_in_ms: number;
}

export interface TrackEventPageViewPayloadValidated {
    url: string;
    impression_token: Token;
    session_token: Token;
    impression_type: string;
    elapsed_time_in_ms: number;
}

export interface TrackEventUserEventPayload {
    impression_token: string;
    event_name: TrackEventUserEventType;
}

export interface TrackEventUserEventPayloadValidated {
    impression_token: Token;
    event_name: TrackEventUserEventType;
}
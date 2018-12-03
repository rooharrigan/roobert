import { Validator } from 'class-validator';
import { VError } from "verror";
import { Token } from '../types/types_logic';
import { TrackEventType, TrackEventTypes, TrackEventUserEventType, TrackEventPageViewImpressionTypes, TrackEventPageViewImpressionType, TrackEventUserEventTypes } from '../types/types_track_api';


/*
* a tester function to tell whether you're up and running on the '/' route
*/
export function greetVisitor(visitor: string): string {
    if (visitor.length > 100){ 
        return "ret_error_string";
    }

    const greeting = `Hello ${visitor}`;

    return greeting;
}

/*
* generic uuid validator for all token types
*/
export async function validate_token(token: string): Promise<Token> {
    const validator = new Validator();
    const valid = validator.isUUID(token);
    if (!valid) {
        throw new VError (
            { info: { token: 'redacted' } },
            "invalid_token"
        );
    }

    return token as Token;
}

/*
* Validator helpers for different track events
*/ 
export async function validate_track_event_type(event_type: string): Promise<TrackEventType> {
    if (event_type in TrackEventTypes){
        return event_type as TrackEventType;
    }

    throw new VError (
        { info: { event_type: event_type } },
        "invalid_event_type"
    );
}

export async function validate_track_page_view_impression_type(impression_type: string): Promise<TrackEventPageViewImpressionType> {
    if (impression_type in TrackEventPageViewImpressionTypes){
        return impression_type as TrackEventPageViewImpressionType;
    }

    throw new VError (
        { info: { impression_type: impression_type } },
        "invalid_impression_type"
    );
}

export async function validate_track_user_event_type(user_event_type: string): Promise<TrackEventUserEventType> {
    if (user_event_type in TrackEventUserEventTypes){
        return user_event_type as TrackEventUserEventType;
    }
}
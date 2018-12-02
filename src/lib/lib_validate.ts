const uuidValidator = require('uuid-validate');
import { VError } from "verror";
import { VisitorToken, TrackEventType, TrackEventTypes } from '../types/types_logic';

/*
* business logic
*/
export function greetVisitor(visitor: string): string {
    if (visitor.length > 100){ 
        return "ret_error_string";
    }

    const greeting = `Hello ${visitor}`;

    return greeting;
}

export async function validate_token(token: string): Promise<VisitorToken> {
    const valid = uuidValidator(token);
    if (!valid) {
        throw new VError (
            { info: { visitor_token: token } },
            "invalid_token"
        );
    }

    return token as VisitorToken;
}

export async function validate_event_type(event_type: string): Promise<TrackEventType> {
    if (event_type in TrackEventTypes){
        return event_type as TrackEventType;
    }

    throw new VError (
        { info: { event_type: event_type } },
        "invalid_event_type"
    );
}
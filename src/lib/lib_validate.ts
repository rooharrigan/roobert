const uuidValidator = require('uuid-validate');
import { VError } from "verror";
import { VisitorToken, TrackEventType } from '../types/types_logic';

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

export function validate_token(token: string): VisitorToken {
    const valid = uuidValidator(token);
    if (!valid) {
        throw new VError (
            { info: { visitor_token: token } },
            "invalid_token"
        );
    }

    if (valid) return token as VisitorToken;
}

export function validate_event_type(event_type: string): TrackEventType {
    if (event_type in TrackEventType){
        return event_type as TrackEventType;
    } else {
        throw new VError (
            { info: { event_type: event_type } },
            "invalid_event_type"
        );
    }
}
import { TrackEventUserEventPayload, TrackEventUserEventPayloadValidated } from "types_track_api";
import { Token } from "types_logic";
import { validate_token, validate_track_user_event_type } from "./lib_validate";
import { getManager } from "typeorm";
import UserEvent from "../entities/user_event";
import { VError } from 'verror';


export async function user_events_main(visitor_token: Token, payload: TrackEventUserEventPayload){
    const valid_payload = await user_events_validate_payload(payload);

    try {
        const row_id = await user_events_add_user_event(visitor_token, valid_payload);
    } catch (err) {
        console.log(err);
        throw new VError(
            {
                name: "sql_error",
            },
            "failed to update user_events",
        )
    }

}

export async function user_events_validate_payload(payload: TrackEventUserEventPayload): Promise<TrackEventUserEventPayloadValidated> {
    const valid_payload = {} as TrackEventUserEventPayloadValidated;
    let impression_token = await validate_token(payload.impression_token);
    valid_payload['impression_token'] = impression_token;
    
    let event_name = await validate_track_user_event_type(payload.event_name);
    valid_payload['event_name'] = event_name;

    return valid_payload;
}

export async function user_events_add_user_event(visitor_token: Token, payload: TrackEventUserEventPayloadValidated){
    const entityManager = getManager();
    
    try {
        const user_event_info = new UserEvent();
        user_event_info.date = Date.now();
        user_event_info.event_name = payload.event_name;
        user_event_info.impression_token = payload.impression_token;
        user_event_info.visitor_token = visitor_token;

        const new_user_event = await entityManager.save('user_events', user_event_info);
    } catch (err) {
        console.log(err);
       let code = err.code;
       throw new VError (
        { 
          name: "sql_error:update",
          cause: err,
          info: { 
            values: "redacted"
          } },
        "sql_error: could not perform update"
      );
    }
}
import { Token } from '../types/types_logic';
import { TrackEventPageViewPayload, TrackEventPageViewPayloadValidated } from '../types/types_track_api';
import { VError } from 'verror';
import { validate_token, validate_track_page_view_impression_type } from '../lib/lib_validate';
import { getManager } from "typeorm";
import PageViewEvent from '../entities/page_view';


export async function page_views_main(visitor_token: Token, payload: TrackEventPageViewPayload){
    const valid_payload = await page_views_validate_payload(payload);

    try {
      const row_id = await page_views_add_page_view(visitor_token, valid_payload);
    } catch (err) {
      throw new VError(
        {
          name: "sql_error:",
        },
        "failed to update page_views"
      );
    }
}

export async function page_views_validate_payload(payload: TrackEventPageViewPayload): Promise<TrackEventPageViewPayloadValidated> {  
  const valid_payload = {
    'url' : payload.url as string,
    'elapsed_time_in_ms': payload.elapsed_time_in_ms as number,
  } as TrackEventPageViewPayloadValidated;

  let impression_token = await validate_token(payload.impression_token);
  valid_payload['impression_token'] = impression_token;

  let session_token = await validate_token(payload.session_token);
  valid_payload['session_token'] = session_token;

  let impression_type = await validate_track_page_view_impression_type(payload.impression_type);
  valid_payload['impression_type'] = impression_type;

  return valid_payload;
}

export async function page_views_add_page_view(visitor_token: Token, payload: TrackEventPageViewPayloadValidated): Promise<void> {
  const entityManager = getManager();

  try {
    const page_view_info = new PageViewEvent();
    page_view_info.url = payload.url;
    page_view_info.date = Date.now();
    page_view_info.view_duration_ms = payload.elapsed_time_in_ms;
    page_view_info.impression_token = payload.impression_token;
    page_view_info.impression_type = payload.impression_type;
    page_view_info.session_token = payload.session_token;
    page_view_info.visitor_token = visitor_token;

    const new_page_view = await entityManager.save('page_views', page_view_info);
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

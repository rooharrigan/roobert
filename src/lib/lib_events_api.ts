// import { Token } from '../types/types_logic';
// import { TrackEventPageViewPayload, TrackEventPageViewPayloadValidated } from '../types/types_track_api';
// import { VError } from 'verror';
// import { validate_token, validate_track_page_view_impression_type } from '../lib/lib_validate';
// import { getManager } from "typeorm";
// import PageViewEvent from '../entities/page_view';


// export async function page_views_main(visitor_token: Token, payload: TrackEventPageViewPayload){
//     const valid_payload = await page_views_validate_payload(payload);

//     try {
//       const row_id = await page_views_add_page_view(visitor_token, valid_payload);
//     } catch (err) {
//       throw new VError(
//         {
//           name: "sql_error:",
//         },
//         "failed to update page_views"
//       );
//     }
// }
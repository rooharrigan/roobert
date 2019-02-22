import { VError } from 'verror';

export async function app_unfurls_respond(visitor_token: Token, payload: TrackEventPageViewPayload){
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
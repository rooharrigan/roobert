import { Http2ServerRequest } from "http2";
import { ApiOut, ApiOk, ApiError } from "../types/types_output";
import { PublicApis } from "../types/types_output";
import * as config from "config";

/*
* Outer api wrapper that sanitizes all inputs and routes to API functions
*/
export async function api(method: string, args: any){
  const visitor_token  = config.get("visitor.token");
  const ip_address = config.get("visitor.ip_address");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Visitor ${visitor_token}`
  };

  // verify api method is defined
  let $method_name = api_get_method_name(method);
  if (!$method_name){
    api_error('unknown_method');
  }
}

  // TODO: verify inputs match allowed args for api method

  // TODO: Route to defined api method
  // const $function_name = "api_" + $method_name;
  //   let ret = 
  //   if ($ret['ok'] == true){
  //     api_ok($ret['payload']);
  //   }

  //   api_error($ret['error']);
  // }

/*
* An API method can only return from these two calls: ok, and error
*/
export async function api_ok(decoded_payload: any): Promise<ApiOk> {
  const payload = JSON.stringify(decoded_payload);

  const out = {
    'ok' : true,
    'out' : payload,
  };

  return out;
}

export function api_error(error: string): ApiError {
  const out = {
    'ok' : true,
    'error' : error,
  };

  return out;
}

/*
* Ensure only defined public methods are callable.
* TODO make this actually check membership in the enum or a public/private flag
*/
function api_get_method_name(method: string): string {
  // TODO: Update to check for membership in a set somehow
  if (method == PublicApis.REPORTING){
    return PublicApis.REPORTING;
  } else if (method == PublicApis.TRACK) {
    return PublicApis.TRACK;
  }
    return null;
}


// TODO
// Define standard inputs and outputs, JSON-only
// All api requests come through a single api_main
// Sanitize inputs (make sure they are all escaped strings)
// Route the args to the correct api endpoint
// Log the call to the endpoint with the bogus args

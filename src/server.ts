import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Logger from 'koa-logger';
import { greetVisitor } from './lib/lib_validate';
import { validate_token, validate_event_type } from './lib/lib_validate';
import { ApiTrackInputs, TrackEventTypes, TrackEventPageViewPayload, TrackEventUserPayload } from './types/types_logic';
// import { page_views_main } from './lib/lib_page_views';
import { createConnection, Connection, AdvancedConsoleLogger } from "typeorm";
import 'reflect-metadata';
import * as config from 'config';
import { VError } from "verror";
import { api_error } from './lib/lib_api';



/*
* Configure app helpers
*/
const app = new Koa();
const router = new Router();
const logger = require('koa-logger');
const koaBody = require('koa-body');
const test_data = require('./data_track.json');

app.use(router.routes());
app.use(router.allowedMethods());
app.use(koaBody());
if (process.env.NODE_ENV == "development") {
    app.use(logger());
}

/*
* Test endpoint to show the app is up and running
*/
router.get('/', async (ctx, next) => {
    try {
        let visitor = "Roo!";
        ctx.body = greetVisitor(visitor);

        let db = await createConnection();

        console.log(db);

    } catch (err) {
        console.log(err);
    }
});


/*
* Receive two event types and store them in a database
*/
router.post('/track', koaBody(),
    async (ctx) => {
        ctx.body = "You made it to track";

        const parsed_params = ctx.request.body as ApiTrackInputs;

        // Validate token is UUID
        let visitor_token = parsed_params.visitor_token;
        try {
            visitor_token = await validate_token(visitor_token);
        } catch (err) {
            console.log(err.message);
            return ctx.throw(400, err.message);
        }

        // Validate event type is one of two allowed
        let event_type = parsed_params.event_type;
        try {
            event_type = await validate_event_type(event_type);
        } catch (err) {
            console.log(err.message);
            return ctx.throw(400, err.message);
        }

        // Type things nicely
        switch (event_type) {
            case TrackEventTypes.page_view: {
                console.log('you are in track page_view');

                const parsed_payload = JSON.parse(parsed_params.payload) as TrackEventPageViewPayload;
                
                // let ret = page_views_main(visitor_token, parsed_payload);
                // console.log(parsed_payload);
                break;
            }

            case TrackEventTypes.user: {
                console.log('you are in track user_event');
                const parsed_payload = JSON.parse(parsed_params.payload) as TrackEventUserPayload;
                break;
            }

            default: {
                console.log("not supposed to get here");
                break;
            }

        }

        // Route to the subsequent event logic

        // Return useful error code or ok statement
    }
);


const port = 3000;
const server = app.listen(port);
console.log(
    "Server running on port %d in %s mode",
    port,
    app.env,
);

/*
* Exports for testing
*/
module.exports = app;
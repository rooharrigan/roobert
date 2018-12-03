import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Logger from 'koa-logger';
import { greetVisitor, validate_token, validate_track_event_type } from './lib/lib_validate';
import { ApiTrackInputs, TrackEventTypes, TrackEventUserEventPayload, TrackEventPageViewPayload, TrackEventPageViewPayloadValidated } from './types/types_track_api';
import { page_views_main } from './lib/lib_page_views';
import { user_events_main } from './lib/lib_user_event';
import { reports_get_pages_main } from './lib/lib_reports';
import { createConnection } from "typeorm";
import 'reflect-metadata';

/*
* Configure app helpers
*/
const app = new Koa();
const router = new Router();
const logger = require('koa-logger');
const koaBody = require('koa-body');
const test_data = require('./data_track.json');


createConnection().then(async connection => {    
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.use(koaBody());
    if (process.env.NODE_ENV == "development") {
        app.use(logger());
    }
}).catch(error => console.log("TypeORM connection error: ", error));

/*
* Test endpoint to show the app is up and running
*/
router.get('/', async (ctx, next) => {
    let visitor = "World!";
    ctx.body = greetVisitor(visitor);
});


/*
* Receive two event types and store them in a database
*/
router.post('/track', koaBody(),
    async (ctx) => {
        // ToDo: abstract these 
        const params = ctx.request.body as ApiTrackInputs;
        let visitor_token = params.visitor_token;
        try {
            visitor_token = await validate_token(visitor_token);
        } catch (err) {
            return ctx.throw(422, err.message);
        }

        let event_type = params.event_type;
        try {
            event_type = await validate_track_event_type(event_type);
        } catch (err) {
            return ctx.throw(422, err.message);
        }

        switch (event_type) {
            case TrackEventTypes.page_view: {
                const parsed_payload = JSON.parse(params.payload) as TrackEventPageViewPayload;               
                try {
                    await page_views_main(visitor_token, parsed_payload);
                } catch (err) {
                    return ctx.throw(422, err.message);
                }
                break;
            }

            case TrackEventTypes.user_event: {
                const parsed_payload = JSON.parse(params.payload) as TrackEventUserEventPayload;
                try {
                    await user_events_main(visitor_token, parsed_payload);
                } catch (err) {
                    return ctx.throw(422, err.message);
                }
                break;
            }

            default: {
                return ctx.throw(404);
            }

        }
        ctx.throw(200, 'update_successful');
    }
);

router.get('/reports/pages', koaBody(),
    async (ctx) => {
        try {
            const pages = await reports_get_pages_main();
           console.log(pages);
        } catch (err) {
           return ctx.throw(422, err.message);
        }
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
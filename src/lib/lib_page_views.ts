import { VisitorToken, TrackEventPageViewPayload } from '../types/types_logic';
import { query, Results, Row, single } from "../db/db_client";
import { VError } from 'verror';
import { Query } from "mysql2/promise";
import * as uuid from "uuid";
import { SQL } from "sql-template-strings";
import { Connection } from 'typeorm';

export interface PageView {
    id: string;
    url: string;
    date: string;
    duration_ms: string;
  }


export async function page_views_main(visitor_token: VisitorToken, payload: TrackEventPageViewPayload){
    const id = uuid();
    const date = Date.now();
    
    const url = 'https://www.mycoolblog.com';
    const duration_ms = '1000';

    try {
        let row = await query(
            SQL`INSERT INTO page_views (id, url, date, view_duration_ms) VALUES (
            ${id}, 
            ${url},
            ${date},
            ${duration_ms})`
            );
    } catch (err) {
    
        throw new VError({
            cause: err,
            info: {
                id,
                url
            }
        },
        "failed to create page_view"
        );
    }

    const page_view = await getPageViewById(id);
    if (!page_view)
      throw new VError(
        { info: { id, url } },
        "page_view not found after insert"
      );
  
    return page_view;
}

export async function getPageViewById(id: string): Promise<PageView> {
    let row: Row | null;
    try {
      row = await single(SQL`SELECT * FROM user WHERE id = ${id}`);
    } catch (err) {
      throw new VError(
        {
          cause: err,
          info: { id }
        },
        "failed to fetch user"
      );
    }
    if (!row)
      throw new VError(
        {
          info: { id }
        },
        "page_view not found"
      );
  
    return row as PageView;
  }
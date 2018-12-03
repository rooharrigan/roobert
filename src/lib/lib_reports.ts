import { getManager, getRepository } from "typeorm";
import { PageViewEvent } from '../entities/page_view';
import { UserEvent } from '../entities/user_event';
import { getConnection } from 'typeorm';

/*
* Nothing in here works
*/ 
export async function reports_get_pages_main(): Promise<void>{
    const highest_views = await reports_get_pages_highest_views();

    const out = {
        pages: {
            highest_views: highest_views,
        }
    }

    // return out;
}

// SELECT url, count(*) from page_views ORDER DESC LIMIT 10;
export async function reports_get_pages_highest_views(): Promise<void> {
    const connection = getConnection();
    const ret = await connection
        .getRepository('page_views')
        .createQueryBuilder('page_views')
        .select('DISTINCT(page_views.url)')
        .addSelect('COUNT(page_views.url) as count')
        .orderBy('count', 'DESC')
        .take(10)
        .getMany();
        
    
    console.log("This is ret: ");
    console.log(ret);
}
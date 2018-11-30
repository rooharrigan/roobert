import { getManager } from "typeorm";
import { PageViews } from "../entities/ud_page_views";

export class PageViewsRepo {
 
    getAllPageViews() {
        // get Employee repository and find all employees
        return getManager().getRepository(PageViews).find();
    }
 
    savePageViews(page_view: PageViews) { 
          return getManager().getRepository(PageViews).save(page_view);
    }
 
}
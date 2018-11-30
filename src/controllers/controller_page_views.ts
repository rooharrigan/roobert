// import { PageViewsRepo } from "../repository/page_views_repo";
// import { PageViews } from "../entities/ud_page_views";
 
// export let getAllPageViews = async (req: Request, res: Response) => {
//     let pvRepo: PageViewsRepo = new PageViewsRepo();
 
//     console.log("Received GetAllEmployees ==> GET");
 
//     pvRepo.getAllPageViews().then((result: any) => {
//         console.log("Result : " + result);
//         res.send(result);
//     });
 
 
// };
 
// export let savePageView = async (req: Request, res: Response) => {
//     let pvRepo: PageViewsRepo = new PageViewsRepo();
 
//     console.log("Received SaveEmployee ==> POST");
//     console.log(req.body);
 
//     let pv:PageView = new PageView();
//     pv.id = req.body.id;
//     pv.url = req.body.url;
//     pv. = req.body.lastName;
 
//     pvRepo.savePageView(pv).then((result: any) => {
//         console.log("Result : " + result);
//         res.send(result);
//     });
// };
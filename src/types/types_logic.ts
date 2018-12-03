/*
* All IDs coming from the database should have a type of row_id
*/
export type RowId = number;



export enum ImpressionType {
    personalized = 'personalized'
}

export enum ReportType {
    webpage_metrics = 'pages',
    visitor_metrics = 'visitors',
}

/*
* Use an opaque type here to ensure all tokens are UUID-verified
*/
export type Token = string;
export enum TokenTypes {
    visitor_token = 'visitor_token',
    user_token = 'user_token',
    session_token = 'session_token'
}
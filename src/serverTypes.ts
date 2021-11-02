
export interface databaseUser {
    did : string,
    ceramicHash : string,
    userName : string,
    did_sign : [{
        payload : string,
        signatures : {
            protected : string,
            signature : string
        }
    }]
}




export interface databasePost {
    did : string,
    post_hash : string,
    did_sign : [{
        payload : string,
        signatures : {
            protected : string,
            signature : string
        }
    }]
}

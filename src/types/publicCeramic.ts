interface UID {
    id : string
}


enum mediaType {
    Image,
    Video
}


export interface User {
    Username: string
    FirstName: string
    LastName: string
    Gender: string
    Description: string
    DateOfBirth: Date
    Phone?: string
    EthAddress: string
    Verified: boolean
}

export interface Comments {
    uid : UID
    comment : string
}

export interface Post {
    UID : UID
    PostID : string
    CommentsArray: Comments[]
    LikesArray: UID[]
    Likes: number
    Comments: number
}


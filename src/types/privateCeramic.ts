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


export interface Post {
    PostID : string
    Text: string
    MediaType : mediaType
    TaggedUsers : string[]
    Media: string

}


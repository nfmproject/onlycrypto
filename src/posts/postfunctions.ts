import { CeramicType } from "../ceramic";
import { createPost } from "../serverApis";
import stringify from "json-stringify-safe";

export async function createPostCall(ceramic: CeramicType, data: object) {
    try {
        const postHash = await ceramic.createData(data)
        const user_did = localStorage.getItem('user_did');
        const signature = localStorage.getItem('did_signature');
        if (!!user_did && !!signature) {
            const payload = {
                did: user_did,
                post_hash: postHash,
                did_sign: JSON.parse(signature),
            };
            console.log(payload)
            console.log(stringify(payload))
            createPost(payload);
        }
        return postHash
    } catch (error) {
        return
    }
}

export async function requestPostCall(ceramic : CeramicType, postId : string) {
    try {
        
    } catch (error) {

    }
}
import { CeramicType } from "../ceramic";
import { postType } from "../ceramicFunctions/ceramicTypes";
import { createPost } from "../serverApis";



export async function createPostCall(ceramic : CeramicType ,data: postType) {

    const postHash = await ceramic.createData(data)
    const user_did = localStorage.getItem('user_did');
    const signature = localStorage.getItem('did_signature');
    if (!!user_did && !!signature) {
        const payload = {
            did: user_did,
            post_hash: postHash,
            did_sign: JSON.parse(signature),
        };
        createPost(payload);
    }
}


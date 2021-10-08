import CeramicClient from '@ceramicnetwork/http-client'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { useRecoilState } from 'recoil';
import { tileState } from '../state/tileState/tileFunctions';
import { User,Post, Comments } from '../types/publicCeramic'



export default function TileFunctions (){
    const [tilesState, setAuthState] = useRecoilState(tileState);

    const createUser = async (ceramic : CeramicClient, content : User, metadata : any, opts : any ) =>  {
        const doc = await TileDocument.create(ceramic, content, metadata, opts)
        const streamId = doc.id.toString()
        return streamId
    }
    const createPost = async (ceramic : CeramicClient, content : Post, metadata : any, opts : any ) => {
        const doc = await TileDocument.create(ceramic, content, metadata, opts)
        const streamId = doc.id.toString()
        return streamId
    }
    const createComment = async (ceramic : CeramicClient, Post : string, content : Comments, metadata : any, opts : any ) =>{
        // HOW to add it to the post
        switch (tilesState) {
            case 'available':                
                const doc = await TileDocument.create(ceramic, content, metadata, opts)
                const streamId = doc.id.toString()
                return streamId
                break;
            default:
                break;
        }
    }
    return {
        createUser,
        createPost,
        createComment
    }
}
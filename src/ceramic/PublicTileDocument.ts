import CeramicClient from '@ceramicnetwork/http-client'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { IDXInit, PostsList } from '../ceramicStatic';
import { tileState } from '../state/tileState/tileFunctions';
import { User,Post, Comments } from '../types/publicCeramic'


const schemas = {
    Post: '',
    PostsList: '',
}




export default function TileFunctions (){
    const [tilesState, setAuthState] = useRecoilState(tileState);

    const saveDraft = useCallback(
        (title: string, text: string , getIDX : IDXInit) => {
          // SET state
          // dispatch({ type: 'draft status', status: 'saving' }) 
          // const { ceramic, idx } = state.auth as AuthenticatedState
          Promise.all([
            TileDocument.create(
              getIDX.ceramic,
              { date: new Date().toISOString(), text },
              { controllers: [], schema: schemas.Post },
            ),
            getIDX.idx.get<PostsList>('posts'),
          ])
            .then(([doc, postsList]) => {
              const posts = postsList?.posts ?? []
              return getIDX.idx
                .set('posts', {
                  posts: [{ id: doc.id.toUrl(), title }, ...posts],
                })
                .then(() => {
                  const streamID = doc.id.toString()
                //   dispatch({ type: 'draft saved', streamID, title, doc }) UPDATE STATE
                })
            })
            .catch((err) => {
              console.log('failed to save draft', err)
            //   dispatch({ type: 'draft status', status: 'failed' }) UPDATE STATE
            })
        },[]
      )
    
    //   const openPost = useCallback(
    //     (streamID: string) => {
    //       dispatch({ type: 'nav post', streamID })
    
    //       if (state.posts[streamID] == null || state.posts[streamID].status === 'init') {
    //         const { ceramic } = state.auth as AuthenticatedState
    //         ceramic.loadDocument<TileDocument>(streamID).then(
    //           (doc) => {
    //             dispatch({ type: 'post loaded', streamID, doc })
    //           },
    //           () => {
    //             dispatch({
    //               type: 'post loading status',
    //               streamID,
    //               status: 'loading failed',
    //             })
    //           },
    //         )
    //       }
    //     },
    //     [state.auth, state.posts],
    //   )
    
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
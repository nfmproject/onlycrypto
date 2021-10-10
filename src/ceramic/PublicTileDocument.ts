import CeramicClient from '@ceramicnetwork/http-client'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { tileState } from '../state/tileState/tileFunctions';
import { User,Post, Comments } from '../types/publicCeramic'



export default function TileFunctions (){
    const [tilesState, setAuthState] = useRecoilState(tileState);

    // const saveDraft = useCallback(
    //     (title: string, text: string) => {
    //       // SET state
    //       // dispatch({ type: 'draft status', status: 'saving' }) 
    //       // const { ceramic, idx } = state.auth as AuthenticatedState
    //       Promise.all([
    //         TileDocument.create(
    //           ceramic,
    //           { date: new Date().toISOString(), text },
    //           { controllers: [idx.id], schema: schemas.Note },
    //         ),
    //         idx.get<NotesList>('notes'),
    //       ])
    //         .then(([doc, notesList]) => {
    //           const notes = notesList?.notes ?? []
    //           return idx
    //             .set('notes', {
    //               notes: [{ id: doc.id.toUrl(), title }, ...notes],
    //             })
    //             .then(() => {
    //               const streamID = doc.id.toString()
    //               dispatch({ type: 'draft saved', streamID, title, doc })
    //             })
    //         })
    //         .catch((err) => {
    //           console.log('failed to save draft', err)
    //           dispatch({ type: 'draft status', status: 'failed' })
    //         })
    //     },
    //     [state.auth],
    //   )
    
    //   const openNote = useCallback(
    //     (streamID: string) => {
    //       dispatch({ type: 'nav note', streamID })
    
    //       if (state.notes[streamID] == null || state.notes[streamID].status === 'init') {
    //         const { ceramic } = state.auth as AuthenticatedState
    //         ceramic.loadDocument<TileDocument>(streamID).then(
    //           (doc) => {
    //             dispatch({ type: 'note loaded', streamID, doc })
    //           },
    //           () => {
    //             dispatch({
    //               type: 'note loading status',
    //               streamID,
    //               status: 'loading failed',
    //             })
    //           },
    //         )
    //       }
    //     },
    //     [state.auth, state.notes],
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
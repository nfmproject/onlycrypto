import type { TileDocument } from '@ceramicnetwork/stream-tile'
import type Ceramic from '@ceramicnetwork/http-client'
import type { IDX } from '@ceramicstudio/idx'
import { useCallback, useReducer, useState } from 'react'

import { schemas } from './config.json'
import { getIDX } from './idx'
import type { IDXInit } from './idx'

type AuthStatus = 'pending' | 'loading' | 'failed'
export type DraftStatus = 'unsaved' | 'saving' | 'failed' | 'saved'
type PostLoadingStatus = 'init' | 'loading' | 'loading failed'
type PostSavingStatus = 'loaded' | 'saving' | 'saving failed' | 'saved'

type UnauthenticatedState = { status: AuthStatus }
type AuthenticatedState = { status: 'done'; ceramic: Ceramic; idx: IDX }
export type AuthState = UnauthenticatedState | AuthenticatedState

type NavDefaultState = { type: 'default' }
type NavDraftState = { type: 'draft' }
type NavPostState = { type: 'post'; streamID: string }

export type IndexLoadedPost = { status: PostLoadingStatus; title: string }
export type StoredPost = {
  status: PostSavingStatus
  title: string
  doc: TileDocument
}

type Store = {
  draftStatus: DraftStatus
  posts: Record<string, IndexLoadedPost | StoredPost>
}
type DefaultState = {
  auth: AuthState
  nav: NavDefaultState
}
type PostState = {
  auth: AuthenticatedState
  nav: NavDraftState | NavPostState
}
export type State = Store & (DefaultState | PostState)


type AuthAction = { type: 'auth'; status: AuthStatus }
type AuthSuccessAction = { type: 'auth success' } & IDXInit
type NavResetAction = { type: 'nav reset' }
type NavDraftAction = { type: 'nav draft' }
type NavPostAction = { type: 'nav post'; streamID: string }
type DraftDeleteAction = { type: 'draft delete' }
type DraftStatusAction = { type: 'draft status'; status: 'saving' | 'failed' }
type DraftSavedAction = {
  type: 'draft saved'
  title: string
  streamID: string
  doc: TileDocument
}
type PostLoadedAction = { type: 'post loaded'; streamID: string; doc: TileDocument }
type PostLoadingStatusAction = {
  type: 'post loading status'
  streamID: string
  status: PostLoadingStatus
}
type PostSavingStatusAction = {
  type: 'post saving status'
  streamID: string
  status: PostSavingStatus
}
type Action =
  | AuthAction
  | AuthSuccessAction
  | NavResetAction
  | NavDraftAction
  | NavPostAction
  | DraftDeleteAction
  | DraftStatusAction
  | DraftSavedAction
  | PostLoadedAction
  | PostLoadingStatusAction
  | PostSavingStatusAction

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'auth':
        return {
          ...state,
          nav: { type: 'default' },
          auth: { status: action.status },
        }
      case 'auth success': {
        const auth = {
          status: 'done',
          ceramic: action.ceramic,
          idx: action.idx,
        } as AuthenticatedState
        return action.myPosts.length
          ? {
              ...state,
              auth,
              posts: action.myPosts.reduce((acc, item) => {
                acc[item.id] = { status: 'init', title: item.id }
                return acc
              }, {} as Record<string, IndexLoadedPost>),
            }
          : {
              auth,
              draftStatus: 'unsaved',
              nav: { type: 'draft' },
              posts: {},
            }
      }
      case 'nav reset':
        return { ...state, nav: { type: 'default' } }
      case 'nav draft':
        return {
          ...state,
          auth: state.auth as AuthenticatedState,
          nav: { type: 'draft' },
        }
      case 'draft status':
        return {
          ...state,
          auth: state.auth as AuthenticatedState,
          draftStatus: action.status,
        }
      case 'draft delete':
        return {
          ...state,
          draftStatus: 'unsaved',
          nav: { type: 'default' },
        }
      case 'draft saved': {
        return {
          auth: state.auth as AuthenticatedState,
          draftStatus: 'unsaved',
          nav: { type: 'post', streamID: action.streamID },
          posts: {
            ...state.posts,
            [action.streamID]: {
              status: 'saved',
              title: action.title,
              doc: action.doc,
            },
          },
        }
      }
      case 'nav post':
        return {
          ...state,
          auth: state.auth as AuthenticatedState,
          nav: {
            type: 'post',
            streamID: action.streamID,
          },
        }
      case 'post loaded': {
        const id = (state.nav as NavPostState).streamID
        const postState = state.posts[id]
        return {
          ...state,
          auth: state.auth as AuthenticatedState,
          posts: {
            ...state.posts,
            [id]: {
              status: 'loaded',
              title: postState.title,
              doc: action.doc,
            },
          },
        }
      }
      case 'post loading status': {
        const id = (state.nav as NavPostState).streamID
        const postState = state.posts[id] as IndexLoadedPost
        return {
          ...state,
          auth: state.auth as AuthenticatedState,
          posts: {
            ...state.posts,
            [id]: { ...postState, status: action.status },
          },
        }
      }
      case 'post saving status': {
        const id = (state.nav as NavPostState).streamID
        const postState = state.posts[id] as StoredPost
        return {
          ...state,
          auth: state.auth as AuthenticatedState,
          posts: {
            ...state.posts,
            [id]: { ...postState, status: action.status },
          },
        }
      }
    }
  }


  export function useApp() {
    const [state, dispatch] = useReducer( reducer,{
      auth: { status: 'pending' },
      draftStatus: 'unsaved',
      nav: { type: 'default' },
      posts: {}
    })

    const authenticate = useCallback((seed: Uint8Array) => {
      dispatch({ type: 'auth', status: 'loading' })
      getIDX(seed).then(
        (init) => {
          dispatch({ type: 'auth success', ...init })
        },
        (err) => {
          console.warn('authenticate call failed', err)
          dispatch({ type: 'auth', status: 'failed' })
        },
      )
    }, [])
  
    const openPost = useCallback(
      (streamID: string) => {
        dispatch({ type: 'nav post', streamID })
  
        if (state.posts[streamID] == null || state.posts[streamID].status === 'init') {
          const { ceramic } = state.auth as AuthenticatedState
          ceramic.loadStream<TileDocument>(streamID).then(
            (doc) => {
              dispatch({ type: 'post loaded', streamID, doc })
            },
            () => {
              dispatch({
                type: 'post loading status',
                streamID,
                status: 'loading failed',
              })
            },
          )
        }
      },
      [state.auth, state.posts],
    )

    const savePost = useCallback((doc: TileDocument, text: string) => {
      const streamID = doc.id.toString()
      dispatch({ type: 'post saving status', streamID, status: 'saving' })
      doc.update({ date: new Date().toISOString(), text }).then(
        () => {
          dispatch({ type: 'post saving status', streamID, status: 'saved' })
        },
        () => {
          dispatch({ type: 'post saving status', streamID, status: 'saving failed' })
        },
      )
    }, [])



  }
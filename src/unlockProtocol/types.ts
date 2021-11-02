
export interface UnlockLock {
    unlocklock: string,
    chainid: number

}
export interface fetchKeyPayload {
    address: string,
    chain: number,
    identifier: string,
    lock: string
}


export interface fetchKeyResponse {
    post  : {
        identifier : string,
        unlockLocks : [UnlockLock],
        unlockKey : string
    }
}

export interface postKeyRequest {
        identifier : string,
        unlockLocks : [UnlockLock],
        unlockKey : string
}
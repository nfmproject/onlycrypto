
export interface UnlockLock {
    unlocklock: string,
    chainid: number

}
export interface fetchKeyPayload {
    address: string,
    chain: number,
    idenrifier: string,
    lock: string
}


export interface fetchKeyResponse {
    post  : {
        identifier : string,
        unlockLocks : [UnlockLock],
        unlockKey : string
    }
}

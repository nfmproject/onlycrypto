import { CeramicType } from "../ceramic";
import profile from "./ceramicTypes";

/**
 * create user profile on ceramic protocol
 * return @bool status
 */

export const  profileCreate = (ceramic : CeramicType, profileData : profile) => {
    ceramic.createData(profileData).then((res) =>{
        return res
    }).catch((error) => {
        console.error(error)
        return
    })
}

export const  profileUpdate = (ceramic : CeramicType,streamID : string, profileData : profile) => {
    ceramic.updateData(streamID , profileData).then((res) =>{
        return res
    }).catch((error) => {
        console.error(error)
        return
    })
}
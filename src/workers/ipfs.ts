import {create} from "ipfs-http-client"


const ipfs = create({ host: 'ipfs.infura.io', port: 5001 , protocol: 'https' });

export function uploadImage(){
const imgdata = new Uint8Array([1,2,3,4,5])
    ipfs.add({
        path: 'avataaars.svg',
        content: imgdata
      }, { wrapWithDirectory: true }).then((result) =>{
          console.log(result.cid)
          return(result.cid)
      })
}

export async function downloadImage(){
    for await (const x of ipfs.cat("QmdhZ32G5hg9T5NSy358zfS3TcBDPUqSbX3eSrztXLMF7u/avataaars.svg")){
        console.log(x)
    }
}
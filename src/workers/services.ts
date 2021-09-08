
import urlcat from 'urlcat'

const keyServerEndpoint = 'https://unlock.iamzub.in/'

export const postUnlockData = async (myBody: string | object) => {
    const response = await fetch(urlcat(keyServerEndpoint, 'add'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myBody), // string or object
    })
    return response.status
}
export const getKey = async <requestKeyResponse>(data: unknown) => {
    const response = await fetch(urlcat(keyServerEndpoint, 'request'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.json()
}

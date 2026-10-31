let apiRoot = ''
let authRoot = ''

if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:8017'
    authRoot = 'http://localhost:3495'
}

if (process.env.BUILD_MODE === 'prod') {
    apiRoot = 'https://be-trello.vercel.app'
    authRoot = 'https://be-trello.vercel.app'
}

export const API_ROOT = apiRoot 
export const AUTH_ROOT = authRoot 


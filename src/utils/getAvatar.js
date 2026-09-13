import { API_ROOT } from './constant'

export const getAvatar = (url) => {
    if (url.includes('https')) {
        return url
    }
    return `${API_ROOT}/v1/manage/users/profile/get-image/avatar?t=${Date.now()}`
}
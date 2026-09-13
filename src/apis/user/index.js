import { API_ROOT } from '~/utils/constant'
import instance from '~/apis/interceptors'

const TIMEOUT = 10000
const UPLOAD_TIMEOUT = 30000

export const uploadImageHeaderApi = async (file) => {
    const response = await instance.patch(
        `${API_ROOT}/v1/manage/users/profile/upload/image-header`,
        file,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                withCredentials: true
            },
            timeout: UPLOAD_TIMEOUT
        }
    )
    return response.data
}

export const uploadAvatarApi = async (file) => {
    const response = await instance.patch(
        `${API_ROOT}/v1/manage/users/profile/upload/avatar`,
        file,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                withCredentials: true
            },
            timeout: UPLOAD_TIMEOUT
        }
    )
    return response.data
}

export const getImageHeaderApi = async (userId) => {
    const response = await instance.get(
        `${API_ROOT}/v1/manage/users/profile/get-image/image-header/${userId}`,
        { timeout: TIMEOUT }
    )
    return response.data
}

export const getAvatarApi = async (userId) => {
    const response = await instance.get(
        `${API_ROOT}/v1/manage/users/profile/get-image/avatar/${userId}`,
        { timeout: TIMEOUT }
    )
    return response.data
}

export const updateProfileApi = async (fieldName, data) => {
    const response = await instance.patch(
        `${API_ROOT}/v1/manage/users/profile/update/${fieldName}`,
        { data },
        { timeout: TIMEOUT }
    )
    return response.data
}

export const updatePasswordApi = async (fieldName, data) => {
    const response = await instance.patch(
        `${API_ROOT}/v1/manage/users/profile/update/${fieldName}`,
        data,
        { timeout: TIMEOUT }
    )
    return response.data
}

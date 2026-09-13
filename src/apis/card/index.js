import { API_ROOT } from '~/utils/constant'
import instance from '~/apis/interceptors'

const TIMEOUT = 10000

export const createNewCardApi = async (newCardData) => {
    const response = await instance.post(
        `${API_ROOT}/v1/cards`,
        newCardData,
        { timeout: TIMEOUT }
    )
    return response.data
}

export const updateCardApi = async (newCardData) => {
    const response = await instance.patch(
        `${API_ROOT}/v1/cards/update`,
        newCardData,
        { timeout: TIMEOUT }
    )
    return response.data
}

const UPLOAD_TIMEOUT = 30000

export const uploadCardCoverApi = async (file, cardUuid) => {
    const response = await instance.patch(
        `${API_ROOT}/v1/cards/upload/card-cover/${cardUuid}`,
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

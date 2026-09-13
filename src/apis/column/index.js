import { API_ROOT } from '~/utils/constant'
import instance from '~/apis/interceptors'

const TIMEOUT = 10000

export const createNewColumnApi = async (newColumnData) => {
    const response = await instance.post(
        `${API_ROOT}/v1/columns`,
        newColumnData,
        { timeout: TIMEOUT }
    )
    return response.data
}

export const updateColumnDetailsApi = async (columnId, updateData) => {
    const response = await instance.put(
        `${API_ROOT}/v1/columns/${columnId}`,
        updateData,
        { timeout: TIMEOUT }
    )
    return response.data
}

export const deleteColumnDetailsApi = async (columnUuid, updateData = {}) => {
    const response = await instance.delete(
        `${API_ROOT}/v1/columns/${columnUuid}`,
        { data: updateData, timeout: TIMEOUT }
    )
    return response.data
}

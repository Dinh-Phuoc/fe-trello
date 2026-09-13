import { API_ROOT } from '~/utils/constant'
import instance from '~/apis/interceptors'

const TIMEOUT = 10000

export const fetchBoardDetailsApi = async (boardUuid) => {
    const response = await instance.get(
        `${API_ROOT}/v1/boards/${boardUuid}`,
        { timeout: TIMEOUT }
    )
    return response.data
}

export const updateBoardDetailsApi = async (boardUuid, updateData) => {
    const response = await instance.put(
        `${API_ROOT}/v1/boards/${boardUuid}`,
        updateData,
        { timeout: TIMEOUT }
    )
    return response.data
}

export const moveCardToDifferentColumnApi = async (updateData) => {
    const response = await instance.put(
        `${API_ROOT}/v1/boards/supports/moving_cards`,
        updateData,
        { timeout: TIMEOUT }
    )
    return response.data
}

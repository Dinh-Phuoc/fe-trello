import { AUTH_ROOT } from '~/utils/constant'
import instance from '~/apis/interceptors'

const TIMEOUT = 10000

const REFRESH_TIMEOUT = 8000

export const loginApi = async (infoAccount) => {
    const response = await instance.post(
        `${AUTH_ROOT}/auth/login`,
        infoAccount,
        { timeout: TIMEOUT }
    )
    return response.data
}

export const refreshApi = async () => {
    const response = await instance.post(
        `${AUTH_ROOT}/auth/refresh`,
        {},
        { timeout: REFRESH_TIMEOUT }
    )
    return response.data
}

export const logoutApi = async () => {
    const response = await instance.delete(
        `${AUTH_ROOT}/auth/logout`,
        { timeout: TIMEOUT }
    )
    return response
}

export const registerApi = async (infoAccount) => {
    const response = await instance.post(
        `${AUTH_ROOT}/auth/register`,
        infoAccount,
        { timeout: TIMEOUT }
    )
    return response.data
}

export const googleAuthApi = async (credential) => {
    const response = await instance.post(
        `${AUTH_ROOT}/auth/google`,
        { credential },
        { timeout: TIMEOUT }
    )
    return response.data
}

export const getInforUserApi = async () => {
    const response = await instance.get(
        `${AUTH_ROOT}/auth/profile`,
        { timeout: TIMEOUT }
    )
    return response.data
}

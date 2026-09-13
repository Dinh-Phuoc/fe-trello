// MUI Lib
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'

// Emotion Lib
import styled from '@emotion/styled'
import { css } from '@emotion/react'

// Sass
import styles from './Auth.module.scss'

// Assets
import bgImageFormLoginLightMD from '~/assets/loginformlight.jpg'
import bgImageFormLoginDarkMD from '~/assets/loginformdark.jpg'
import { Container } from '@mui/material'

// ============================================================
// Theme helpers - lấy giá trị từ theme, fallback về default
// ============================================================
const getThemeColor = (theme, key = 'myColor') =>
    theme?.trelloCustom?.[key] || '#ff9a9cc4'

const getModalBg = (theme) =>
    theme?.palette?.mode === 'dark' ? '#080808' : 'white'

const getPaperBg = (theme) =>
    theme?.palette?.mode === 'dark'
        ? theme?.palette?.background?.default || '#111111'
        : 'white'

// ============================================================
// Layout containers
// ============================================================
export const AuthRoot = styled(Box)`
    height: 100vh;
    display: flex;
    flex-direction: column;
`

export const HeaderBar = styled(Box)(({ theme }) => {
    const isDark = theme?.palette?.mode === 'dark'
    return css`
        display: flex;
        justify-content: space-between;
        align-content: center;
        height: 56px;
        padding: 0 12px;
        background-color: ${isDark ? '#121212' : 'white'};
    `
})

export const LogoLink = styled('a')`
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    text-decoration: none;
`

export const LogoText = styled(Typography)`
    margin-left: 4px;
    font-size: 1rem;
    font-weight: bold;
    color: #ff9a9cc4;
    display: none;

    @media (min-width: 600px) {
        display: block;
    }
`

// ============================================================
// Form Card
// ============================================================
export const PageBackground = styled(Box)`
        flex: 1;
        margin-top: 12px;
        background-color: #ffeef8;
        display: flex;
`

export const StyledContainer = styled(Container)(({ theme }) => {
    const isDark = theme?.palette?.mode === 'dark'
    const bgImage = isDark ? bgImageFormLoginDarkMD : bgImageFormLoginLightMD
    return css`
        position: relative;
        margin-block: auto;
        height: 100%;
        max-height: 700px;
        padding-block: 24px;
        background-color: ${isDark ? '#111111' : '#ffeef8'};
        background-size: cover;
        background-repeat: no-repeat;
        background-position: right bottom;

        @media (min-width: 600px) {
            background-image: url(${bgImage});
        }
    `
})

export const FormCard = styled(Box)(({ theme }) =>
    css`
        background-color: ${getPaperBg(theme)};
        width: 100%;
        height: 100%;
        max-height: 610px;
        border-radius: 6px;
        margin: 0;
        padding: 16px 24px 24px;
        max-width: 400px;
    `
)

// ============================================================
// Speech bubble (callout)
// ============================================================
export const CalloutBubble = styled(Box)(({ theme }) => {
    const isDark = theme?.palette?.mode === 'dark'
    const myColor = getThemeColor(theme)
    return css`
        display: none;

        @media (min-width: 600px) {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 20%;
            right: 10%;
            width: 210px;
            background-color: ${isDark ? myColor : 'white'};
            border: 2px solid ${myColor};
            border-radius: 10px;
            padding: 15px 20px;
            max-width: 250px;
            font-size: 16px;
            box-shadow: 3px 3px 0px ${myColor};

            &::after {
                content: '';
                position: absolute;
                bottom: -18px;
                left: 50%;
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 15px solid ${myColor};
            }
        }

        @media (min-width: 900px) {
            width: 255px;
        }
    `
})

export const CalloutText = styled(Typography)(({ theme }) => {
    const isDark = theme?.palette?.mode === 'dark'
    const myColor = getThemeColor(theme)
    return css`
        font-family: 'El Messiri';
        font-weight: 800;
        color: ${isDark ? 'black' : myColor};
        text-align: center;
        line-height: 2.8rem;
        font-size: 2.5rem;

        @media (min-width: 900px) {
            line-height: 2.6rem;
            font-size: 2.4rem;
        }
    `
})

// ============================================================
// Modal helpers
// ============================================================
const modalBoxBase = ({ theme }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: ${getModalBg(theme)};
    border: 2px solid #ff9a9cc4;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    padding: 8px;
    text-align: center;
`

export const ResultModalBox = styled(Box)(modalBoxBase)

export const ProcessingModalBox = styled(Box)(modalBoxBase)

export const ModalTitle = styled(Typography)`
    text-align: center;
    margin: 0 12px 12px;
    font-family: 'El Messiri';
    font-size: 1.8rem;
    color: #ff9a9cc4;
    font-weight: 700;

    @media (min-width: 900px) {
        font-weight: 800;
        font-size: 2.4rem;
    }
`

export const ModalProcessingTitle = styled(Typography)`
    margin: 0 12px 12px;
    font-family: 'El Messiri';
    font-size: 1.8rem;
    color: #ff9a9cc4;
    font-weight: 700;

    @media (min-width: 900px) {
        font-weight: 800;
        font-size: 2.4rem;
    }
`

export const MyCircularProgress = styled(CircularProgress)`
    color: #ff9a9cc4;
`

export const MyModal = styled(Modal)`
    ${styles.modalRoot}
`
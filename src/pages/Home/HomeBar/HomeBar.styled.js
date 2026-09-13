// MUI Lib
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'

// Emotion Lib
import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const NavbarRoot = styled(Box, {
    shouldForwardProp: (prop) => !['$scrolled'].includes(prop)
})(({ $scrolled, theme }) => {
    const appBarHeight = theme?.trelloCustom?.appBarHeight || '58px'
    const lgBreakpoint = (theme?.breakpoints?.values?.lg || 1200) - 0.02

    const baseStyles = css`
        position: fixed;
        z-index: 99;
        top: 0;
        width: 100%;
        margin: auto;
        height: ${appBarHeight};
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding-left: 16px;
        overflow-x: auto;
        background-color: ${theme?.palette?.mode === 'dark' ? 'black' : 'white'};

        &:hover {
            box-shadow: rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px;
        }

        @media (max-width: ${lgBreakpoint}px) {
            justify-content: space-between;
        }
    `

    if ($scrolled) {
        return css`
            ${baseStyles};
            box-shadow: rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px;
        `
    }
    return baseStyles
})

export const LeftGroup = styled(Box)`
    display: flex;
`

export const MenuWrapper = styled(Box)`
    display: flex;
    align-content: center;
    gap: 8px;
`

export const LogoBlock = styled(Box)`
    display: flex;
    align-items: center;
    gap: 4px;
`

export const LogoIcon = styled(SvgIcon)(({ theme }) => {
    const myColor = theme?.trelloCustom?.myColor || '#ff9a9cc4'
    return css`
        color: ${myColor};
    `
})

export const LogoText = styled(Typography)(({ theme }) => {
    const myColor = theme?.trelloCustom?.myColor || '#ff9a9cc4'
    return css`
        font-size: 1.1rem;
        font-weight: bold;
        min-width: 80px;
        color: ${myColor};
    `
})

const iconBase = ({ theme }) => {
    const myColor = theme?.trelloCustom?.myColor || '#ff9a9cc4'
    return css`
        text-decoration: none;
        height: 2rem;
        width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${myColor};
        transition: all 0.3s;
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;

        &:hover {
            transform: scale(1.2);
            color: ${myColor};
        }

        &:focus-visible {
            outline: 2px solid ${myColor};
            outline-offset: 2px;
        }
    `
}

export const SocialSvgIcon = styled(SvgIcon)`
    && {
        width: 100%;
        height: 100%;
        font-size: 2.25rem;
    }
`

export const SocialIconBox = styled(Box)(iconBase)

export const SocialIconButton = styled(Button)(iconBase)

export const CVBadge = styled(Box)(({ theme }) => {
    const myColor = theme?.trelloCustom?.myColor || '#ff9a9cc4'
    return css`
        ${iconBase({ theme })};
        border: 1px solid ${myColor};
        border-radius: 50%;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;

        &:hover {
            color: ${myColor};
        }
    `
})

export const QrImage = styled('img')`
    width: 200px;
    height: 200px;
`

export const StyledDivider = styled(Divider)(({ theme }) => {
    const myColor = theme?.trelloCustom?.myColor || '#ff9a9cc4'
    return css`
        border-color: ${myColor};
    `
})

export const RightMobileGroup = styled(Box)(({ theme }) => {
    const mdBreakpoint = theme?.breakpoints?.values?.md || 900
    return css`
        display: flex;
        height: 100%;
        align-items: center;

        @media (min-width: ${mdBreakpoint}px) {
            display: none;
        }
    `
})

export const RightDesktopGroup = styled(Box)(({ theme }) => {
    const mdBreakpoint = theme?.breakpoints?.values?.md || 900
    return css`
        display: none;
        justify-content: flex-end;
        height: 100%;

        @media (min-width: ${mdBreakpoint}px) {
            display: flex;
        }
    `
})

export const LoginLink = styled('a')(({ theme }) => {
    const myColor = theme?.trelloCustom?.myColor || '#ff9a9cc4'
    const mdBreakpoint = theme?.breakpoints?.values?.md || 900
    return css`
        display: none;
        text-decoration: none;
        align-content: center;
        font-weight: 600;
        height: 100%;
        width: 180px;
        text-align: center;
        color: ${myColor};
        transition: color 0.2s ease-in-out;

        &:hover {
            color: #f0777acc;
        }

        @media (min-width: ${mdBreakpoint}px) {
            display: block;
        }
    `
})

export const ContactTriggerDesktop = styled(Box)(({ theme }) => {
    const myColor = theme?.trelloCustom?.myColor || '#ff9a9cc4'
    return css`
        align-content: center;
        cursor: pointer;
        font-weight: 600;
        margin-left: auto;
        margin-right: 16px;
        height: 100%;
        width: 180px;
        text-align: center;
        color: white;
        background-color: ${myColor};
        border-radius: 0;
        transition: background-color 0.2s ease-in-out;

        &:hover {
            background-color: #f0777acc;
        }
    `
})

export const InnerFlex = styled(Box)`
    display: flex;
    height: 100%;
    align-items: center;
`

export const QrTooltip = styled(Tooltip)`
    background-color: transparent;
    padding: 0;
`

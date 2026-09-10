// MUI Lib
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'

// styled-components Lib
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const getMyColor = ({ theme }) => theme?.trelloCustom?.myColor || '#ff9a9cc4'
const getAppBarHeight = ({ theme }) => theme?.trelloCustom?.appBarHeight || '58px'
const getMdBreakpoint = ({ theme }) => theme?.breakpoints?.values?.md || 900
const getLgBreakpoint = ({ theme }) => theme?.breakpoints?.values?.lg || 1200

export const NavbarRoot = styled(Box)`
    position: fixed;
    z-index: 99;
    top: 0;
    width: 100%;
    margin: auto;
    height: ${getAppBarHeight};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding-left: 16px;
    overflow-x: auto;
    background-color: ${({ theme }) => (theme?.palette?.mode === 'dark' ? 'black' : 'white')};

    &:hover {
        box-shadow: rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px;
    }

    ${({ $scrolled }) =>
        $scrolled &&
        css`
            box-shadow: rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px;
        `}

    @media (max-width: ${({ theme }) => getLgBreakpoint({ theme }) - 0.02}px) {
        justify-content: space-between;
    }
`

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

export const LogoIcon = styled(SvgIcon)`
    color: ${getMyColor};
`

export const LogoText = styled(Typography)`
    font-size: 1.1rem;
    font-weight: bold;
    min-width: 80px;
    color: ${getMyColor};
`

const iconBase = css`
    text-decoration: none;
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${getMyColor};
    transition: all 0.3s;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;

    &:hover {
        transform: scale(1.2);
        color: ${getMyColor};
    }

    &:focus-visible {
        outline: 2px solid ${getMyColor};
        outline-offset: 2px;
    }
`

export const SocialSvgIcon = styled(SvgIcon)`
    && {
        width: 100%;
        height: 100%;
        font-size: 2.25rem;
    }
`

export const SocialIconBox = styled(Box)`
    ${iconBase}
`

export const SocialIconButton = styled(Button)`
    ${iconBase}
`

export const CVBadge = styled(Box)`
    ${iconBase};
    border: 1px solid ${getMyColor};
    border-radius: 50%;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
        color: ${getMyColor};
    }
`

export const QrImage = styled(Box).attrs({ component: 'img' })`
    width: 200px;
    height: 200px;
`

export const StyledDivider = styled(Divider)`
    border-color: ${getMyColor};
`

export const RightMobileGroup = styled(Box)`
    display: flex;
    height: 100%;
    align-items: center;

    @media (min-width: ${getMdBreakpoint}px) {
        display: none;
    }
`

export const RightDesktopGroup = styled(Box)`
    display: none;
    justify-content: flex-end;
    height: 100%;

    @media (min-width: ${getMdBreakpoint}px) {
        display: flex;
    }
`

export const LoginLink = styled(Box).attrs({ component: Link })`
    display: none;
    text-decoration: none;
    align-content: center;
    font-weight: 600;
    height: 100%;
    width: 180px;
    text-align: center;
    color: ${getMyColor};
    transition: color 0.2s ease-in-out;

    &:hover {
        color: #f0777acc;
    }

    @media (min-width: ${getMdBreakpoint}px) {
        display: block;
    }
`

export const ContactTriggerDesktop = styled(Box)`
    align-content: center;
    cursor: pointer;
    font-weight: 600;
    margin-left: auto;
    margin-right: 16px;
    height: 100%;
    width: 180px;
    text-align: center;
    color: white;
    background-color: ${getMyColor};
    border-radius: 0;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f0777acc;
    }
`

export const InnerFlex = styled(Box)`
    display: flex;
    height: 100%;
    align-items: center;
`

export const QrTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ tooltip: className }} />)`
    background-color: transparent;
    padding: 0;
`

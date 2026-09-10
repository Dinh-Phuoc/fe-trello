import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { styled } from '@mui/material/styles'

// ── Shared base fragments ───────────────────────────────────────────────────────
const CARD_INDICATOR_BASE = {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    height: '100%',
    border: '3px solid'
}

const TITLE_TYPOGRAPHY = {
    userSelect: 'none',
    fontWeight: 600,
    '&.MuiTypography-root.MuiTypography-body1': { fontSize: '1.2rem' }
}

const DESC_TYPOGRAPHY = {
    userSelect: 'none',
    '&.MuiTypography-root.MuiTypography-body1': { fontSize: '1rem' }
}

// ── Styled components ────────────────────────────────────────────────────────────
// `$isActive` is a transient prop (starts with `$`) — won't be forwarded to the DOM
const DesktopCardPaper = styled(Paper, { shouldForwardProp: (p) => p !== '$isActive' })(
    ({ $isActive }) => ({
        padding: '12px 12px 12px 32px',
        marginBottom: '12px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.3s',
        '&:after': {
            ...CARD_INDICATOR_BASE,
            visibility: $isActive ? 'visible' : 'hidden',
            color: $isActive ? '#ff9a9c' : 'transparent'
        },
        '@media (hover: hover) and (pointer: fine)': {
            '&:hover': {
                transform: 'translate(-5px, -5px)',
                '&:after': { visibility: 'visible', color: '#ff9a9c40' }
            }
        }
    })
)

const DotIndicator = styled(Typography, { shouldForwardProp: (p) => p !== '$isActive' })(
    ({ $isActive }) => ({
        width: $isActive ? '6rem' : '8px',
        height: '8px',
        borderRadius: '4px',
        backgroundColor: '#091e42',
        opacity: $isActive ? 0.5 : 1,
        marginLeft: '4px',
        transition: 'width 0.3s, opacity 0.3s'
    })
)

const MobileCardPaper = styled(Paper, { shouldForwardProp: (p) => p !== '$isActive' })(
    ({ $isActive, theme }) => ({
        width: '100%',
        padding: '12px',
        position: 'relative',
        '&:after': {
            ...CARD_INDICATOR_BASE,
            color: theme.trelloCustom?.myColor,
            visibility: $isActive ? 'visible' : 'hidden'
        }
    })
)

export { CARD_INDICATOR_BASE, TITLE_TYPOGRAPHY, DESC_TYPOGRAPHY, DesktopCardPaper, DotIndicator, MobileCardPaper }

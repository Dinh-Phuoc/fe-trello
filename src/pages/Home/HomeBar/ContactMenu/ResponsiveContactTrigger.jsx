// React Lib
import { cloneElement, isValidElement } from 'react'

// MUI Lib
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// Me
import { ContactTriggerDesktop } from '~/pages/Home/HomeBar/HomeBar.styled'

const COMPACT_BREAKPOINT = 400

export default function ResponsiveContactTrigger({ children, ...triggerProps }) {
    const theme = useTheme()
    const isCompact = useMediaQuery(theme.breakpoints.down(COMPACT_BREAKPOINT))

    if (isCompact) {
        const ariaLabel = typeof children === 'string' ? children : 'Contact'
        return (
            <Button
                {...triggerProps}
                aria-label={ariaLabel}
                size="small"
                sx={{ display: 'flex', alignItems: 'center', height: '100%', marginRight: '8px' }}
            >
                Contact
            </Button>
        )
    }

    if (isValidElement(children)) {
        return cloneElement(children, triggerProps)
    }

    return <ContactTriggerDesktop {...triggerProps}>{children ?? 'Contact'}</ContactTriggerDesktop>
}

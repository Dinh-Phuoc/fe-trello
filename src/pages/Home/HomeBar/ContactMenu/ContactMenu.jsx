// React Lib
import { cloneElement, isValidElement } from 'react'

// MUI Lib
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import FacebookOutlined from '@mui/icons-material/FacebookOutlined'
import Instagram from '@mui/icons-material/Instagram'
import Email from '@mui/icons-material/Email'

// Me
import ZaloQRCode from '~/assets/qrZalo.jpg'
import { ReactComponent as ZaloIcon } from '~/assets/zaloIcon.svg'
import { SOCIAL_LINKS } from '~/pages/Home/HomeBar/constants'
import { menuListStyles } from '~/pages/Home/HomeBar/menuStyles'
import useDisclose from '~/hooks/useDisclose'
import {
    SocialSvgIcon,
    SocialIconBox,
    SocialIconButton,
    CVBadge,
    QrImage,
    StyledDivider,
    QrTooltip
} from '~/pages/Home/HomeBar/HomeBar.styled.jsx'

const ICON_MAP = {
    FacebookOutlined,
    Instagram,
    Email,
    Zalo: ZaloIcon
}

function ContactItem({ link, onOpenZalo }) {
    switch (link.type) {
    case 'icon':
        return (
            <SocialIconBox component="a" href={link.href} target={link.target} rel={link.rel}>
                <SocialSvgIcon component={ICON_MAP[link.icon]} inheritViewBox />
            </SocialIconBox>
        )

    case 'zalo':
        return (
            <SocialIconButton component="button" type="button" onClick={onOpenZalo} aria-label="Open Zalo QR code">
                <SocialSvgIcon component={ZaloIcon} inheritViewBox />
            </SocialIconButton>
        )

    case 'divider':
        return <StyledDivider orientation="vertical" flexItem />

    case 'cv':
        return (
            <SocialIconBox component="a" href={link.href} target="_blank" rel="noopener noreferrer">
                <CVBadge>CV</CVBadge>
            </SocialIconBox>
        )

    default:
        return null
    }
}

function ContactItems({ isMobile, onOpenZalo }) {
    return SOCIAL_LINKS.map((link) => {
        if (link.type === 'zalo' && !isMobile) {
            return (
                <QrTooltip key={link.id} arrow placement="bottom" title={<QrImage src={ZaloQRCode} alt="Zalo QR" />}>
                    <SocialIconBox component="span" tabIndex={0}>
                        <SocialSvgIcon component={ZaloIcon} inheritViewBox />
                    </SocialIconBox>
                </QrTooltip>
            )
        }
        return <ContactItem key={link.id} link={link} onOpenZalo={onOpenZalo} />
    })
}

function TriggerButton({ buttonId, open, onClick, children }) {
    const ariaProps = {
        id: buttonId,
        'aria-controls': open ? 'basic-menu' : undefined,
        'aria-haspopup': 'true',
        'aria-expanded': open ? 'true' : undefined,
        onClick
    }

    if (isValidElement(children)) {
        return cloneElement(children, ariaProps)
    }

    return (
        <Box component="button" type="button" {...ariaProps}>
            {children ?? 'Contact'}
        </Box>
    )
}

export default function ContactMenu({ buttonId, isMobile = false, trigger }) {
    const [anchorEl, { isOpen: open, onOpen: handleOpen, onClose: handleClose }] = useDisclose()
    const [anchorZalo, { isOpen: openZalo, onOpen: onOpenZaloRaw, onClose: handleCloseZalo }] = useDisclose()

    const handleOpenZalo = (e) => {
        e.stopPropagation()
        onOpenZaloRaw(e)
    }

    return (
        <>
            <TriggerButton buttonId={buttonId} open={open} onClick={handleOpen}>
                {trigger ?? 'Contact'}
            </TriggerButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': buttonId }}
                sx={menuListStyles}
            >
                <ContactItems isMobile={isMobile} onOpenZalo={handleOpenZalo} />
            </Menu>

            {isMobile && (
                <Menu anchorEl={anchorZalo} open={openZalo} onClose={handleCloseZalo}>
                    <QrImage src={ZaloQRCode} alt="Zalo QR" className="qrZaloCode" />
                </Menu>
            )}
        </>
    )
}

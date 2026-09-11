// React Lib
import { useEffect, useRef, useState } from 'react'

// MUI Lib
import { useTheme as useMuiTheme } from '@mui/material/styles'

// styled-components
import { ThemeProvider as SCThemeProvider } from 'styled-components'

// Me
import HomeMenu from './HomeMenu/HomeMenu'
import HomeMenuXS from './HomeMenuXS/HomeMenuXS'
import ContactMenu from './ContactMenu/ContactMenu'
import ResponsiveContactTrigger from './ContactMenu/ResponsiveContactTrigger'
import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import {
    NavbarRoot,
    LeftGroup,
    MenuWrapper,
    LogoBlock,
    LogoIcon,
    LogoText,
    RightMobileGroup,
    RightDesktopGroup,
    InnerFlex,
    LoginLink
} from './HomeBar.styled.jsx'

export default function HomeBar() {
    const [scrolled, setScrolled] = useState(false)
    const navbarRef = useRef(null)
    const muiTheme = useMuiTheme()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <SCThemeProvider theme={muiTheme}>
            <NavbarRoot $scrolled={scrolled} ref={navbarRef}>
                {/* === Left: Logo + main menu === */}
                <LeftGroup>
                    <MenuWrapper>
                        <LogoBlock>
                            <LogoIcon component={TrelloIcon} fontSize="large" inheritViewBox />
                            <LogoText variant="body2" component="span">
                                Sariii nè!
                            </LogoText>
                        </LogoBlock>
                    </MenuWrapper>
                    <HomeMenu />
                </LeftGroup>

                {/* === Right: mobile contact + drawer menu === */}
                <RightMobileGroup>
                    <ContactMenu
                        buttonId="basic-button-mobile"
                        isMobile
                        trigger={<ResponsiveContactTrigger>Contact</ResponsiveContactTrigger>}
                    />
                    <HomeMenuXS />
                </RightMobileGroup>

                {/* === Right: desktop login + contact menu === */}
                <RightDesktopGroup>
                    <LoginLink to="/auth">Login</LoginLink>
                    <InnerFlex>
                        <ContactMenu
                            buttonId="basic-button-desktop"
                            isMobile={false}
                            trigger={<ResponsiveContactTrigger>Contact</ResponsiveContactTrigger>}
                        />
                    </InnerFlex>
                </RightDesktopGroup>
            </NavbarRoot>
        </SCThemeProvider>
    )
}

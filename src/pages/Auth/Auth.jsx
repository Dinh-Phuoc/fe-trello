// React Lib
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// MUI Lib
import Container from '@mui/material/Container'
import SvgIcon from '@mui/material/SvgIcon'

// Google OAuth
import { GoogleOAuthProvider } from '@react-oauth/google'

// Project
import { googleAuthApi, loginApi, registerApi } from '~/apis'
import MyTabs from '~/components/Tabs/store/MyTabs'
import MyTabList from '~/components/Tabs/MyTabList'
import MyTabItem from '~/components/Tabs/MyTabItem'
import MyTabPanel from '~/components/Tabs/MyTabPanel'
import Login from '~/components/AppBar/Menus/Login'
import Register from '~/components/AppBar/Menus/Register'
import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'

// Local
import Footer from '../Home/Footer/Footer'
import ResultModal from './ResultModal'
import ProcessingModal from './ProcessingModal'
import {
    AuthRoot,
    HeaderBar,
    LogoLink,
    LogoText,
    PageBackground,
    FormCard,
    CalloutBubble,
    CalloutText,
    StyledContainer
} from './Auth.styled'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const ERROR_MESSAGE = 'Tài khoản hoặc mật khẩu không chính xác nhé bae'
const GOOGLE_ERROR_MESSAGE = 'Đăng nhập bằng Google thất bại, thử lại nhé!'

const calloutMessages = {
    login: 'Đăng nhập thôi nàooooo!',
    register: 'Tạo mới tài khoản ngay thôiiiii!'
}

const initialModalState = {
    loginError: false,
    loginProcessing: false,
    registerProcessing: false,
    registerResult: false
}

// Cấu hình modal - data-driven approach
const MODAL_CONFIG = [
    {
        key: 'loginError',
        Component: ResultModal,
        variant: 'error',
        getMessage: () => ERROR_MESSAGE
    },
    {
        key: 'loginProcessing',
        Component: ProcessingModal,
        getMessage: () => 'Đang đăng nhập'
    },
    {
        key: 'registerProcessing',
        Component: ProcessingModal,
        getMessage: () => 'Đang đăng ký tài khoản'
    }
]

export default function Auth() {
    const navigate = useNavigate()

    const [activeUnderLine, setActiveUnderLine] = useState({
        login: true,
        register: false
    })
    const [modals, setModals] = useState(initialModalState)
    const [titleForm, setTitleForm] = useState('login')
    const [registerMessage, setRegisterMessage] = useState('')

    const childrenLoginRef = useRef()
    const childrenRegisterRef = useRef()

    useEffect(() => {
        const isRegister = !!localStorage.getItem('register')
        setActiveUnderLine({ login: !isRegister, register: isRegister })
    }, [])

    // ===== Modal helpers =====
    const toggleModal = (key, value) =>
        setModals((prev) => ({ ...prev, [key]: value }))

    const openModal = (key) => toggleModal(key, true)
    const closeModal = (key) => toggleModal(key, false)

    // ===== Handlers =====
    const handleLogin = async () => {
        const data = childrenLoginRef.current?.getChildrenRef()
        if (!data) return

        openModal('loginProcessing')
        const resultLogin = await loginApi(data)
        closeModal('loginProcessing')

        if (!resultLogin?.isSuccess) {
            setRegisterMessage(ERROR_MESSAGE)
            openModal('loginError')
            return
        }
        navigate('/trello')
    }

    const handleRegister = async () => {
        const data = childrenRegisterRef.current?.getChildrenValue()
        openModal('registerProcessing')

        const result = await registerApi(data)

        if (result.status === 409) {
            closeModal('registerProcessing')
            openModal('registerResult')
            setRegisterMessage(result.message)
            return
        }

        if (localStorage.getItem('email')) localStorage.removeItem('email')
        if (localStorage.getItem('register')) localStorage.removeItem('register')

        setActiveUnderLine({ login: true, register: false })
        closeModal('registerProcessing')
        openModal('registerResult')
        setRegisterMessage(result.message)
    }

    const handleGoogleSuccess = async (credential) => {
        try {
            openModal('loginProcessing')
            const result = await googleAuthApi(credential)
            closeModal('loginProcessing')

            if (!result?.isSuccess) {
                setRegisterMessage(result?.message || GOOGLE_ERROR_MESSAGE)
                openModal('loginError')
                return
            }

            navigate('/trello')
        } catch (err) {
            closeModal('loginProcessing')
            setRegisterMessage(GOOGLE_ERROR_MESSAGE)
            openModal('loginError')
        }
    }

    const handleGoogleError = () => {
        setRegisterMessage(GOOGLE_ERROR_MESSAGE)
        openModal('loginError')
    }

    const handleSetTitle = () =>
        setTitleForm((prev) => (prev === 'register' ? 'login' : 'register'))

    const calloutText = useMemo(
        () => calloutMessages[titleForm] || calloutMessages.login,
        [titleForm]
    )

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AuthRoot>
                <Container>
                    <HeaderBar>
                        <LogoLink as={Link} to="/">
                            <SvgIcon
                                component={TrelloIcon}
                                fontSize="small"
                                inheritViewBox
                                sx={{ color: '#ff9a9cc4' }}
                            />
                            <LogoText variant="span">Sariii nè!</LogoText>
                        </LogoLink>
                    </HeaderBar>
                </Container>

                <PageBackground>
                    <StyledContainer maxWidth="md">
                        <MyTabs>
                            <FormCard>
                                <MyTabs>
                                    <MyTabList>
                                        <MyTabItem
                                            onClick={handleSetTitle}
                                            myStyleChild={{ textTransform: 'upperCase' }}
                                            handleTitleLoginForm={() => setTitleForm('login')}
                                            value={0}
                                            active={activeUnderLine.login}
                                        >
                                                            Đăng nhập
                                        </MyTabItem>

                                        <MyTabItem
                                            onClick={handleSetTitle}
                                            myStyleChild={{ textTransform: 'upperCase' }}
                                            handleTitleRegisterForm={() => setTitleForm('register')}
                                            value={1}
                                            active={activeUnderLine.register}
                                        >
                                                            Đăng ký
                                        </MyTabItem>
                                    </MyTabList>

                                    <MyTabPanel value={0}>
                                        <Login
                                            ref={childrenLoginRef}
                                            onClick={handleLogin}
                                            onGoogleSuccess={handleGoogleSuccess}
                                            onGoogleError={handleGoogleError}
                                        />
                                    </MyTabPanel>

                                    <MyTabPanel value={1}>
                                        <Register
                                            ref={childrenRegisterRef}
                                            onClick={handleRegister}
                                            onGoogleSuccess={handleGoogleSuccess}
                                            onGoogleError={handleGoogleError}
                                        />
                                    </MyTabPanel>
                                </MyTabs>
                            </FormCard>
                        </MyTabs>

                        <CalloutBubble>
                            <CalloutText variant="body1">{calloutText}</CalloutText>
                        </CalloutBubble>
                    </StyledContainer>

                </PageBackground>

                <Footer display="none" />

                {/* Render modals theo config - DRY principle */}
                {MODAL_CONFIG.map(({ key, getMessage, Component, variant }) => {
                    if (!modals[key]) return null
                    return (
                        <Component
                            key={key}
                            open={modals[key]}
                            onClose={() => closeModal(key)}
                            message={getMessage()}
                            {...(variant && { variant })}
                        />
                    )
                })}

                {/* registerResult cần state động - tách riêng */}
                {modals.registerResult && (
                    <ResultModal
                        open={modals.registerResult}
                        onClose={() => closeModal('registerResult')}
                        message={registerMessage}
                        variant="success"
                    />
                )}
            </AuthRoot>
        </GoogleOAuthProvider>
    )
}
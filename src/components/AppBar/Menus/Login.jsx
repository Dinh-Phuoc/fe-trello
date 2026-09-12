
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import { forwardRef, useImperativeHandle, useRef } from 'react'

const Login = forwardRef(({ onClick, onGoogleSuccess, onGoogleError, ...props }, ref) => {
    const userNameRef = useRef()
    const passwordRef = useRef()

    const passProps = {
        onClick,
        ...props
    }

    useImperativeHandle(ref, () => ({
        getChildrenRef: () => {
            const userName = userNameRef.current?.value
            const password = passwordRef.current?.value

            if (!userName || !password) return

            return { userName, password }
        }
    }))

    return (
        <Box>
            <Stack spacing={2}>
                <TextField
                    inputRef={userNameRef}
                    sx={{
                        '& input': {
                            p: '8px'
                        },
                        '& .MuiInputLabel-root': {
                            top: '-6px'
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key.toLowerCase() === 'l') {
                            e.stopPropagation()
                        }
                    }}
                    label='Tài khoản' id="usernamelogin" aria-describedby="my-helper-text"
                />

                <TextField
                    inputRef={passwordRef}
                    sx={{
                        '& input': {
                            p: '8px'
                        },
                        '& .MuiInputLabel-root': {
                            top: '-6px'
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key.toLowerCase() === 'l') {
                            e.stopPropagation()
                        }
                    }}
                    label='Mật khẩu' type='password' id="passwordlogin" aria-describedby="my-helper-text"
                />


                <Button variant='outlined' onClick={passProps.onClick}>Đăng nhập</Button>
                <Typography sx={{ textAlign: 'center' }} variant='body1'> Hoặc </Typography>

                {/* Google OAuth Login */}
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        onGoogleSuccess?.(credentialResponse.credential)
                    }}
                    onError={() => {
                        onGoogleError?.()
                    }}
                    useOneTap={false}
                    auto_select={false}
                    theme="outline"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                    logo_alignment="left"
                    width="100%"
                />

            </Stack>
        </Box>
    )
})

export default Login

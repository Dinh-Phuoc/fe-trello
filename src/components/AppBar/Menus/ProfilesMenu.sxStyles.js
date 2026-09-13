// ============================================================
// sxStyles.js - Tách các sx props phức tạp ra constants
// ============================================================
// Mục đích:
// - Tách các sx object lớn ra khỏi JSX
// - Giữ JSX gọn gàng, dễ đọc
// - Dynamic styles (theme-based) vẫn ở đây vì cần theme callback
//
// Quy ước:
// - Export CONSTANT (UPPER_SNAKE_CASE) cho sx object
// - Theme callback functions inline (theme => ...)

// ============================================================
// 1. Paper container (menu dropdown)
// ============================================================
export const PAPER_SX = {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#232323' : 'background.paper'),
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0
    }
}

// ============================================================
// 2. Header title ("Tài khoản")
// ============================================================
export const HEADER_TITLE_SX = {
    ml: '8px',
    mb: '12px',
    fontSize: '1.1rem'
}

// ============================================================
// 3. User info trong menu (fullName, userName)
// ============================================================
export const FULLNAME_SX = {
    lineHeight: 1,
    color: (theme) => theme.palette.primary.contrastText
}

export const USERNAME_SX = {
    lineHeight: 1,
    color: (theme) => theme.palette.primary.contrastText,
    '&.MuiTypography-body1': { fontSize: '0.8rem' }
}

// ============================================================
// 4. Menu item text
// ============================================================
export const MENU_ITEM_TEXT_SX = {
    color: (theme) => theme.palette.primary.contrastText,
    '&.MuiTypography-body1': { fontSize: '1rem' }
}

// ============================================================
// 5. Avatar sizes
// ============================================================
export const TRIGGER_AVATAR_SX = { width: 32, height: 32 }

// ============================================================
// 6. Dark Mode Switch - phức tạp nhất
// ============================================================
// SVG moon icon (dark mode)
const MOON_ICON_URL = `url("data:image/svg+xmlutf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
    '#fff'
)}' d='M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z'/></svg>")`

// SVG sun icon (light mode)
const SUN_ICON_URL = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
    '#fff'
)}' d='M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z'/></svg>")`

export const SWITCH_SX = {
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: MOON_ICON_URL
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be')
            }
        }
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#003892' : '#001e3c'),
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: SUN_ICON_URL
        }
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'),
        borderRadius: 20 / 2
    },
    '& .MuiFormControlLabel-label': {
        padding: '12px 70px 12px 0px'
    }
}

// ============================================================
// 7. Visibility helpers (responsive)
// ============================================================
// Chỉ hiện trên mobile (xs)
export const MOBILE_ONLY_SX = { display: { xs: 'block', sm: 'none' } }

// Ẩn trên mobile (chỉ hiện từ md trở lên)
export const DESKTOP_ONLY_SX = { display: { sm: 'none', md: 'none' } }

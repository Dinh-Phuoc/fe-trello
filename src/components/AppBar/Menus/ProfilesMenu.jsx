import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useColorScheme } from '@mui/material'

import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import HelpOutline from '@mui/icons-material/HelpOutline'
import NotificationsNone from '@mui/icons-material/NotificationsNone'
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined'

import styles from './ProfilesMenu.module.scss'
import {
    PAPER_SX,
    HEADER_TITLE_SX,
    FULLNAME_SX,
    USERNAME_SX,
    MENU_ITEM_TEXT_SX,
    TRIGGER_AVATAR_SX,
    SWITCH_SX,
    DESKTOP_ONLY_SX,
    MOBILE_ONLY_SX
} from './ProfilesMenu.sxStyles'

import { userSelector } from '~/redux/selector'
import { API_ROOT } from '~/utils/constant'
import { logoutApi } from '~/apis'

// ===== Constants =====
const STORAGE_THEME_KEY = 'mui-mode'
const DEFAULT_AVATAR_URL = 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-2409187029.jpg'

const avatarUrl = (url) => {
    if (url.includes('https')) {
        return url
    }
    return `${API_ROOT}/v1/manage/users/profile/get-image/avatar/?t=${Date.now()}`
}

const MenuHeader = ({ user }) => (
    <>
        <Typography sx={HEADER_TITLE_SX} variant="h6">
            Tài khoản
        </Typography>

        <Box className={styles.headerContainer}>
            <Avatar
                className={styles.smallAvatar}
                alt="Your Avatar"
                src={user?.avatar ? avatarUrl(user.avatar) : DEFAULT_AVATAR_URL}
            />

            <Box className={styles.userInfoColumn}>
                <Typography sx={FULLNAME_SX}>
                    {user?.fullName || 'User'}
                </Typography>
                <Typography sx={USERNAME_SX}>
                    @{user?.userName || 'username'}
                </Typography>
            </Box>
        </Box>

        <Divider />
    </>
)

const LinkedMenuItem = ({ to, icon, children, sx }) => (
    <Link to={to} className={styles.linkWrapper}>
        <MenuItem sx={sx}>
            <ListItemIcon>{icon}</ListItemIcon>
            <Typography sx={MENU_ITEM_TEXT_SX}>{children}</Typography>
        </MenuItem>
    </Link>
)


const DarkModeSwitch = ({ checked, onChange }) => (
    <MenuItem sx={{ height: '32px', ...MOBILE_ONLY_SX }}>
        <FormControlLabel
            control={
                <Switch
                    sx={SWITCH_SX}
                    checked={checked}
                    onChange={onChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            }
            label="Dark Mode"
        />
    </MenuItem>
)

export default function Profiles() {
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()
    const { data: user } = useSelector(userSelector)
    const { setMode } = useColorScheme()
    const isDarkMode = localStorage.getItem(STORAGE_THEME_KEY) === 'dark'
    const [checked, setChecked] = useState(isDarkMode)
    const open = Boolean(anchorEl)

    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handleChange = (event) => {
        const isChecked = event.target.checked
        setChecked(isChecked)
        setMode(isChecked ? 'dark' : 'light')
    }

    const handleLogOut = async () => {
        try {
            await logoutApi()
        } finally {
            navigate('/')
        }
    }
    
    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ padding: 0 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        sx={TRIGGER_AVATAR_SX}
                        alt="Your Avatar"
                        src={user?.avatar ? avatarUrl(user.avatar) : DEFAULT_AVATAR_URL}
                    />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{ paper: { elevation: 2, sx: PAPER_SX } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuHeader user={user} />

                <LinkedMenuItem
                    to="/profile"
                    icon={<PersonOutlineOutlined />}
                >
                    Thông tin tài khoản
                </LinkedMenuItem>

                <LinkedMenuItem
                    to="/profile"
                    icon={<HelpOutline fontSize="medium" />}
                    sx={DESKTOP_ONLY_SX}
                >
                    Phản hồi
                </LinkedMenuItem>

                <LinkedMenuItem
                    to="/profile"
                    icon={<NotificationsNone fontSize="medium" />}
                    sx={DESKTOP_ONLY_SX}
                >
                    Thông báo
                </LinkedMenuItem>

                <DarkModeSwitch checked={checked} onChange={handleChange} />

                <Divider />

                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="medium" />
                    </ListItemIcon>
                    Thêm tài khoản
                </MenuItem>

                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="medium" />
                    </ListItemIcon>
                    Cái đặt
                </MenuItem>

                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="medium" />
                    </ListItemIcon>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </Box>
    )
}

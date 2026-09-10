// Reusable list of social/contact links rendered inside the contact menus
export const CV_URL =
    'https://cv.fullstack.edu.vn/view/50a59a03-d012-4aa7-9f7d-c3581e906d03?token=rMzDCgAkeAS4CcwOG4G0WCgoSCwOgCW'

export const SOCIAL_LINKS = [
    {
        id: 'facebook',
        href: 'https://www.facebook.com/saru.an.169/',
        type: 'icon',
        icon: 'FacebookOutlined',
        target: '_blank',
        rel: 'noopener noreferrer'
    },
    {
        id: 'instagram',
        href: 'https://www.instagram.com/pdphuoc_ordinary/',
        type: 'icon',
        icon: 'Instagram',
        target: '_blank',
        rel: 'noopener noreferrer'
    },
    {
        id: 'email',
        href: 'mailto:phandinhphuoc02@gmail.com',
        type: 'icon',
        icon: 'Email'
    },
    {
        id: 'zalo',
        type: 'zalo'
    },
    {
        id: 'divider',
        type: 'divider'
    },
    {
        id: 'cv',
        href: CV_URL,
        type: 'cv'
    }
]

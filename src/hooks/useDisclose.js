import { useCallback, useState } from 'react'

export default function useDisclose(initialState = false) {
    const [anchorEl, setAnchorEl] = useState(initialState ? initialState : null)

    const isOpen = Boolean(anchorEl)

    const onOpen = useCallback((e) => {
        if (e && e.currentTarget) {
            setAnchorEl(e.currentTarget)
        } else {
            setAnchorEl(true)
        }
    }, [])

    const onClose = useCallback(() => setAnchorEl(null), [])

    const onToggle = useCallback((e) => {
        if (e && e.currentTarget) {
            setAnchorEl((prev) => (prev ? null : e.currentTarget))
        } else {
            setAnchorEl((prev) => (prev ? null : true))
        }
    }, [])

    return [anchorEl, { isOpen, onOpen, onClose, onToggle }]
}

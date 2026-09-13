import SentimentDissatisfied from '@mui/icons-material/SentimentDissatisfied'
import Face2Outlined from '@mui/icons-material/Face2Outlined'

import { MyModal, ResultModalBox, ModalTitle } from './Auth.styled'

/**
 * ResultModal - Hiển thị kết quả sau khi xử lý (lỗi hoặc thành công)
 * @param {boolean} open
 * @param {function} onClose
 * @param {string} message
 * @param {'error' | 'success'} variant
 */
export default function ResultModal({ open, onClose, message, variant = 'error' }) {
    const Icon = variant === 'success' ? Face2Outlined : SentimentDissatisfied

    return (
        <MyModal
            open={open}
            onClose={onClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <ResultModalBox>
                <Icon fontSize="large" sx={{ color: '#ff9a9cc4' }} />
                <ModalTitle id="modal-modal-description">{message}</ModalTitle>
            </ResultModalBox>
        </MyModal>
    )
}
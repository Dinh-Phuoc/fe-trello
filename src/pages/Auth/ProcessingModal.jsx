import { MyModal, ProcessingModalBox, ModalProcessingTitle, MyCircularProgress } from './Auth.styled'

/**
 * ProcessingModal - Hiển thị loading khi đang xử lý đăng nhập/đăng ký
 * @param {boolean} open
 * @param {function} onClose
 * @param {string} message - Text hiển thị (VD: "Đang đăng nhập", "Đang đăng ký...")
 */
export default function ProcessingModal({ open, onClose, message }) {
    return (
        <MyModal
            open={open}
            onClose={onClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <ProcessingModalBox>
                <ModalProcessingTitle>{message}</ModalProcessingTitle>
                <MyCircularProgress />
            </ProcessingModalBox>
        </MyModal>
    )
}
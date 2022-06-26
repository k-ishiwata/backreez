import React from 'react'
import { Modal as BaseModal } from '@mantine/core'
import { ModalProps } from '@mantine/core/lib/components/Modal'

const Modal: React.FC<ModalProps> = (props) => {
    const params = {
        ...props,
        overlayOpacity: 0.25,
        overlayBlur: 3
    }
    return (
        <BaseModal {...params}>
            {props.children}
        </BaseModal>
    )
}

export default Modal

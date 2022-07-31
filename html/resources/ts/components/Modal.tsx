import React from 'react'
import { Modal as BaseModal } from '@mantine/core'
import { ModalProps } from '@mantine/core/lib/Modal/Modal'
import { Title } from '@mantine/core'

export const modalOption = {
    overlayOpacity: 0.25,
    overlayBlur: 3
}

const Modal: React.FC<ModalProps> = (props) => {
    const params = {
        ...props,
        ...modalOption,
    }

    params.title = (<Title order={3}>{params.title}</Title>)

    return (
        <BaseModal {...params}>
            {props.children}
        </BaseModal>
    )
}

export default Modal

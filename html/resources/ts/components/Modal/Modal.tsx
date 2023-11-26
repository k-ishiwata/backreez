import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { styled } from '@/stitches.config'
import { IoClose } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
import { useConfirmDialog } from '@/hooks/modal'
import { Button } from '@/components/Button'
import { Group } from '@/components/layouts'

const Overlay = styled('div', {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(0, 0, 0, .15)',
    backdropFilter: 'blur(3px)',
})

const Content = styled('div', {
    width: 800,
    background: '$bg',
    padding: 24,
    position: 'absolute',
    top: 100,
    left: '50%',
    transform: 'translateX(-50%)',
})

const ModalTitle = styled('h3', {
    fontSize: '$lgx',
    marginBottom: 20,
})

const CloseButton = styled('button', {
    position: 'absolute',
    right: 20,
    top: 20,
    border: 'none',
    background: 'none',
    fontSize: 20,
    cursor: 'pointer',
    color: '$gray',
    lineHeight: 1,
    padding: 3,

    '&:hover': {
        background: '$grayLight'
    }
})

const Body = styled('div', {

})

const Footer = styled('div', {
    marginTop: 20,
})

type BaseModalProps = {
    title?: string
    handleCloseModal: () => void
    children: ReactNode
    isVisible: boolean
}

export const BaseModal: React.FC<BaseModalProps> = ({
    title,
    handleCloseModal,
    children,
    isVisible
}) => {
    return ReactDOM.createPortal(
        <AnimatePresence>
            {isVisible &&
                <Overlay onMouseDown={handleCloseModal}>
                    <motion.div
                        key="modal"
                        initial={{ scale: 0.9, originY: "500px" }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <Content onMouseDown={e => e.stopPropagation()}>
                            <CloseButton type="button" onClick={handleCloseModal}><IoClose /></CloseButton>
                            {title && <ModalTitle>{title}</ModalTitle>}
                            <Body>{children}</Body>
                        </Content>
                    </motion.div>
                </Overlay>
            }
        </AnimatePresence>,
        document.getElementById('portal')!
    )
}

export const DeleteConfirmDialog: React.FC = () => {
    const {
        item,
        closeDialog
    } = useConfirmDialog('delete')

    return ReactDOM.createPortal(
        <AnimatePresence>
            {item &&
                <Overlay onMouseDown={closeDialog}>
                    <motion.div
                        key="confirmDialog"
                        initial={{ scale: 0.9, originY: "300px" }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98], restSpeed: 10 }}
                    >
                        <Content
                            css={{
                                width: 400,
                            }}
                            onMouseDown={e => e.stopPropagation()}
                        >
                            <CloseButton type="button" onClick={closeDialog}><IoClose/></CloseButton>
                            <ModalTitle>{item.title}</ModalTitle>
                            <Body>{item.message}</Body>
                            <Footer>
                                <Group gap="sm" css={{ justifyContent: 'flex-end' }}>
                                    <Button onClick={closeDialog}>キャンセル</Button>
                                    <Button color="red" onClick={item.action}>削除</Button>
                                </Group>
                            </Footer>
                        </Content>
                    </motion.div>
                </Overlay>
            }
        </AnimatePresence>,
        document.getElementById('portal')!
    )
}

import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { styled } from '@/stitches.config'
import { IoClose } from 'react-icons/io5'
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
    marginLeft: -400,
    minHeight: '30vh',
    background: '$bg',
    padding: 24,
    position: 'absolute',
    top: 100,
    left: '50%',
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

type ModalBaseProps = {
    title?: string
    handleCloseModal: () => void
    children: ReactNode
}

export const ModalBase: React.FC<ModalBaseProps> = ({
    title,
    handleCloseModal,
    children
}) => {
    return ReactDOM.createPortal(
        <Overlay onMouseDown={handleCloseModal}>
            <Content onMouseDown={e => e.stopPropagation()}>
                <CloseButton type="button" onClick={handleCloseModal}><IoClose /></CloseButton>
                {title && <ModalTitle>{title}</ModalTitle>}
                <Body>{children}</Body>
            </Content>
        </Overlay>,
        document.getElementById('portal')!
    )
}


export const ConfirmDialog = ({ title, message, closeModal, action }: {
    title: string
    message: string
    closeModal: React.MouseEventHandler
    action: React.MouseEventHandler
}) => {
    return ReactDOM.createPortal(
        <Overlay onMouseDown={closeModal}>
            <Content
                css={{
                    width: 400,
                    marginLeft: -200,
                    minHeight: 0,
                }}
                onMouseDown={e => e.stopPropagation()}
            >
                <CloseButton type="button" onClick={closeModal}><IoClose /></CloseButton>
                {title && <ModalTitle>{title}</ModalTitle>}
                <Body>{message}</Body>
                <Footer>
                    <Group gap="sm" css={{justifyContent: 'flex-end'}}>
                        <Button onClick={closeModal}>キャンセル</Button>
                        <Button color="red" onClick={action}>削除</Button>
                    </Group>
                </Footer>
            </Content>
        </Overlay>,
        document.getElementById('portal')!
    )
}

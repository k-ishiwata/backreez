import React from 'react'
import ReactDOM from 'react-dom'
import { styled } from '@/stitches.config'
import { Loader } from '@/components'

const Overlay = styled('div', {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(255, 255, 255, .7)',
    backdropFilter: 'blur(3px)',
})

type Props = {
    isVisible: boolean
}

export const LoadingOverlay: React.FC<Props> = ({
    isVisible
}) => {
    return ReactDOM.createPortal(
        isVisible && <Overlay><Loader /></Overlay>,
        document.getElementById('portal')!
    )
}

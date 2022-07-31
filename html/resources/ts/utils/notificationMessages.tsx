import React from 'react'
import {
    IoCheckmarkSharp,
    IoCloseSharp
} from 'react-icons/io5'

type NotificationMessage = {
    title?: string
    message: string
    color: string
    icon: React.ReactNode,
    styles: () => {}
}

const successMessage = (
    message: string
): NotificationMessage => {
    return {
        title: '成功',
        message: message,
        color: 'green',
        icon: <IoCheckmarkSharp />,
        styles: () => ({
            title: {
                fontWeight: 'bold'
            }
        })
    }
}

const errorMessage = (
    message: string
): NotificationMessage => {
    return {
        title: '失敗',
        message: message,
        color: 'red',
        icon: <IoCloseSharp />,
        styles: () => ({
            title: {
                fontWeight: 'bold'
            }
        })
    }
}

export {
    successMessage,
    errorMessage
}

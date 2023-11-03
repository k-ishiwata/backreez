import React, { useCallback } from 'react'
import { useSetVisible } from './DropdownMenu'

type DropdownTriggerProps = {
    children: React.ReactNode
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
    children
}) => {
    const setIsVisible = useSetVisible()

    const handleToggle = useCallback(() => {
        setIsVisible(prev => !prev)
    }, [setIsVisible])

    return (
        <div onClick={handleToggle}>{children}</div>
    )
}

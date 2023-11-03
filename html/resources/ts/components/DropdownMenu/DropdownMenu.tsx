import React, {
    useState,
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react'
import { styled } from '@/stitches.config'
import { useClickAway } from '@uidotdev/usehooks'

type VisibleState = {
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

const visibleContext = createContext<VisibleState>({
    isVisible: false,
    setIsVisible: () => undefined,
})

export const useVisible = () => useContext(visibleContext).isVisible
export const useSetVisible = () => useContext(visibleContext).setIsVisible

type DropdownProps =  React.ComponentPropsWithRef<'div'> & {
    children: React.ReactNode
}

const DropdownWrapStyle = styled('div', {
    position: 'relative',
})

export const DropdownWrap = React.forwardRef<HTMLDivElement, DropdownProps>(
    ({children}
) => {
    const [isVisible, setIsVisible] = useState(false)

    const ref = useClickAway<HTMLDivElement>(() => {
        setIsVisible(false)
    })

    return (
        <visibleContext.Provider value={{ isVisible, setIsVisible}}>
            <DropdownWrapStyle ref={ref}>
                {children}
            </DropdownWrapStyle>
        </visibleContext.Provider>
    )
})

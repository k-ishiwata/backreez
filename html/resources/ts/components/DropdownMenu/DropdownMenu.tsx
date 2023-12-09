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

const DropdownWrapStyle = styled('div', {
    position: 'relative',
})

type DropdownProps =  React.ComponentPropsWithRef<typeof DropdownWrapStyle> & {
    children: React.ReactNode
}

export const DropdownWrap = React.forwardRef<HTMLDivElement, DropdownProps>((
    {children},
    ref
) => {
    const [isVisible, setIsVisible] = useState(false)

    const refAway = useClickAway<HTMLDivElement>(() => {
        setIsVisible(false)
    })

    return (
        <visibleContext.Provider value={{isVisible, setIsVisible}}>
            <DropdownWrapStyle ref={refAway}>
                {children}
            </DropdownWrapStyle>
        </visibleContext.Provider>
    )
})

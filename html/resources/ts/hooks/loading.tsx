import React, {
    createContext,
    useState,
    useContext,
    ReactNode
} from 'react'

type LoadingContextProps = {
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Loading = createContext<LoadingContextProps>({
    isLoading: false,
    setIsLoading: () => {}
})

export const LoadingProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Loading.Provider value={{ isLoading, setIsLoading }}>
            { children }
        </Loading.Provider>
    )
}

export const useLoading = () => useContext(Loading)

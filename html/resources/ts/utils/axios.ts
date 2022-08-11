import { AxiosError } from 'axios'
import { UseFormSetError } from 'react-hook-form/dist/types/form'

/**
 * バリデーションエラーをセット
 * @param error
 * @param setError
 */
export const setValidationError = (
    error: AxiosError,
    setError: UseFormSetError<any>
) => {
    if (error.response?.data.errors) {
        Object.entries(error.response?.data.errors).map(([key, value]) => {
            const tempValue = value as string[]
            setError(key, {
                type: 'focus',
                message: tempValue[0]
            })
        })
    }
}

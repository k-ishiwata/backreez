import { styled } from '@/stitches.config'

export const Input = styled('input', {
    inputBase: '',
    lineHeight: 'calc(2.2rem - 0.125rem)',

    variants: {
        size: {
            sm: {
                height: '1.7rem',
                minHeight: '1.7rem',
                lineHeight: 'calc(1.7rem - 0.125rem)',
                paddingLeft: 'calc(1.7rem / 3)',
                paddingRight: 'calc(1.7rem / 3)',
            }
        },
        error: {
            true: {
                inputError: ''
            }
        },
    }
})

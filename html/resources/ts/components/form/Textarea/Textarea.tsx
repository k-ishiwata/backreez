import { styled } from '@/stitches.config'

export const Textarea = styled('textarea', {
    inputBase: '',
    height: 'auto',
    lineHeight: 1.5,

    variants: {
        size: {
            sm: {
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

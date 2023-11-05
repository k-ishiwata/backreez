import { styled } from '@/stitches.config'

export const Label = styled('label', {
    display: 'block',
    variants: {
        required: {
            true: {
                '&::after': {
                    color: '$red',
                    content: ' *',
                    fontSize: 15,
                }
            }
        },
        error: {
            true: {
                color: '$red',
            }
        },
    }
})

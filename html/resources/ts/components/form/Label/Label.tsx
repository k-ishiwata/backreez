import { styled } from '@/stitches.config'

export const Label = styled('label', {
    display: 'block',
    marginTop: 4,
    marginBottom: 4,

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
        size: {
            sm: {
                fontSize: '$sm',
            }
        },
        error: {
            true: {
                color: '$red',
            }
        },
    }
})

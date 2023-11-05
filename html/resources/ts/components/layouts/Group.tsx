import { styled } from '@/stitches.config'

export const Group = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    variants: {
        between: {
            true: {
                justifyContent: 'space-between',
            }
        },
        gap: {
            sm: {
                gap: 5,
            }
        },
    },
})

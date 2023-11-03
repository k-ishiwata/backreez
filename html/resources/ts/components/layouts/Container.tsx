import { styled } from '@/stitches.config'

export const Container = styled('div', {
    width: 960,
    margin: '0 auto',
    padding: '40px 0',

    variants: {
        size: {
            sm: {
                width: 600
            }
        },
    }
})

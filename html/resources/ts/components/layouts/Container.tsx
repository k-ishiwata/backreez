import { styled } from '@/stitches.config'

export const Container = styled('div', {
    width: 960,
    margin: '0 auto',
    padding: '15px 0',

    variants: {
        size: {
            sm: {
                width: 600
            },
            full: {
                width: '100%'
            }
        },
    }
})

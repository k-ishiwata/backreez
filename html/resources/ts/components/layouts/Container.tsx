import { styled } from '@/stitches.config'

export const Container = styled('div', {
    maxWidth: 960,
    margin: '0 auto',
    padding: '15px 0',

    variants: {
        position: {
            left: {
                margin: 0,
            }
        },
        size: {
            sm: {
                maxWidth: 600
            },
            full: {
                maxWidth: '100%'
            }
        },
    }
})

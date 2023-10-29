import { globalCss } from '@stitches/react'

export const globalStyles = globalCss({
    body: {
        color: '$font',
        fontSize: '$md',
        background: '$bg',
    },
    a: {
        color: '$primary',
        transition: 'color 0.3s',

        '&:hover': {
            color: '$primaryHover',
            textDecoration: 'none',
        }
    },
    h1: {
        marginBottom: 10,
    }
})

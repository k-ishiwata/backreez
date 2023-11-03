import { styled } from '@/stitches.config'

export const IconButton = styled('button', {
    outline: 'none',
    background: '$bg',
    border: 'solid 1px $border',
    width: 32,
    height: 32,
    borderRadius: '$md',
    cursor: 'pointer',

    '&:hover': {
        background: '$bgHover',
    },

    ' svg': {
        color: '$font',
        width: '100%',
        height: '100%',
    }
})

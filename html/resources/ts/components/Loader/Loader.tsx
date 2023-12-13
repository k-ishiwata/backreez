import { styled, keyframes } from '@/stitches.config'

const loadAnimation = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

export const Loader = styled('div', {
    borderRadius: '50%',
    width: 50,
    height: 50,
    margin: '60px auto',
    fontSize: '10px',
    position: 'relative',
    textIndent: '-9999em',
    borderTop: '.7em solid rgba(215,237,252)',
    borderRight: '.7em solid rgba(215,237,252)',
    borderBottom: '.7em solid rgba(215,237,252)',
    borderLeft: '.7em solid $primary',
    transform: 'translateZ(0)',
    animation: `${loadAnimation} .4s infinite linear`,

    '&:after': {
        borderRadius: '50%',
        width: 50,
        height: 50,
    },

    variants: {
        size: {
            sm: {
                width: 20,
                height: 20,
                margin: '12px 0',
                borderWidth: '.3em',

                '&:after': {
                    width: 20,
                    height: 20,
                },

            }
        }
    }
})

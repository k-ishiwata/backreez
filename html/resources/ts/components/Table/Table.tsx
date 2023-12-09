import { styled } from '@/stitches.config'

export const Table = styled('table', {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1em',

    'th,td': {
        padding: 7,
        borderBottom: 'solid 1px $border',
    },
    'th': {
        paddingTop: 9,
        paddingBottom: 9,
        borderTop: 'solid 1px $border',
        textAlign: 'left',
    },
    'tr:first-child td': {
        borderTop: 'solid 1px $border',
    },

    variants: {
        stripe: {
            true: {
                'tbody tr:nth-child(odd)': {
                    background: '$grayLight',
                },
            }
        },
    },
})

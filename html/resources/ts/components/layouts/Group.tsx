import { styled } from '@/stitches.config'

const GroupBase = styled('div', {
    display: 'flex',
    gap: 20,

    variants: {
        justify: {
            start: {
                justifyContent: 'flex-start',
            },
            end: {
                justifyContent: 'flex-end',
            },
            between: {
                justifyContent: 'space-between',
            },
            center: {
                justifyContent: 'center',
            },
        },
        center: {
            true: {
                alignItems: 'center',
            }
        },
        gap: {
            sm: {
                gap: 10,
            }
        },
    },
})

const GroupCol = styled('div', {
    width: '100%',
})

export const Group = Object.assign(GroupBase, {
    Col: GroupCol,
})

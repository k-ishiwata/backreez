import { styled } from '@/stitches.config'

const GroupBase = styled('div', {
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

const GroupCol = styled('div', {
    width: '100%',
})

export const Group = Object.assign(GroupBase, {
    Col: GroupCol,
})

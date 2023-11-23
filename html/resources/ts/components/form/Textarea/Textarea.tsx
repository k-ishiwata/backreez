import { styled } from '@/stitches.config'

export const Textarea = styled('textarea', {
    width: '100%',
    display: 'block',
    textAlign: 'left',
    border: '1px solid $border',
    transition: 'border-color 100ms ease',
    padding: 'calc(2.2rem / 3)',
    borderRadius: '$md',
    outlineColor: '$primary',
    margin: '4px 0',

    variants: {
        size: {
            sm: {
                paddingLeft: 'calc(1.7rem / 3)',
                paddingRight: 'calc(1.7rem / 3)',
            }
        },
        error: {
            true: {
                color: '$red',
                borderColor: '$red',
            }
        },
    }
})
